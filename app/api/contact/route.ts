import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

export type ContactFormData = z.infer<typeof formSchema>;

export async function POST(request: Request) {
    // Check environment variable immediately
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
        console.error("Missing RESEND_API_KEY environment variable");
        return NextResponse.json(
            { error: "Server misconfiguration" },
            { status: 500 }
        );
    }

    // Initialize Resend with API key
    const resend = new Resend(resendApiKey);

    try {
        // Parse the request body
        const body = await request.json();

        // Validate the incoming data
        const result = formSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid form data", details: result.error.format() },
                { status: 400 }
            );
        }

        const { name, lastName, email, message } = result.data;

        // Your admin email where you want to receive notifications
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!adminEmail) {
            console.error("Missing ADMIN_EMAIL environment variable");
            return NextResponse.json(
                { error: "Server misconfiguration" },
                { status: 500 }
            );
        }

        // Format date in more natural language (Day Month, Hour:Minute)
        const now = new Date();
        const fiveHoursEarlier = new Date(now.getTime() - 5 * 60 * 60 * 1000);
        // Format as "23 March, 20:12"
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
        }).format(fiveHoursEarlier);

        // Create HTML email template
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <title>Astra UI Submission</title>
    <style>
        :root {
            color-scheme: light dark;
        }
        
        @font-face {
            font-family: 'Geist';
            font-style: normal;
            font-weight: 700;
            src: url(https://fonts.cdnfonts.com/css/geist);
        }
        
        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap);
        }
        
        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            src: url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap);
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            color: #000000;
            background-color: white;
            -webkit-font-smoothing: antialiased;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        h1, h2, h3, .info-label {
            font-family: 'Geist', Verdana, Geneva, sans-serif;
            letter-spacing: -0.02em;
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            body {
                color: #FFFFFF;
                background-color: #121212;
            }
        }
        
        .email-wrapper {
            width: 100%;
            max-width: 100%;
            display: flex;
            justify-content: center;
            padding: 20px 10px;
        }
        
        .email-container {
            width: 100%;
            max-width: 100%;
            background-color: #F5F5F5;
            overflow: hidden;
            border-radius: 12px;
        }
        
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #1e1e1e;
            }
        }
        
        .email-header {
            background-color: #000000;
            padding: 28px 24px;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        
        @media (prefers-color-scheme: dark) {
            .email-header {
                background-color: #000000;
            }
        }
        
        .logo {
            max-width: 120px;
            height: auto;
            margin-bottom: 16px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        
        .email-header h1 {
            color: #FFFFFF;
            margin: 0;
            font-weight: 700;
            font-size: 26px;
        }
        
        .email-content {
            padding: 36px 24px;
            position: relative;
            z-index: 1;
            background-repeat: repeat;
            background-position: center;
            background-size: 400px auto;
        }
        
        /* Semi-transparent overlay for better text readability */
        .email-content::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(245, 245, 245, 0.85);
            z-index: -1;
        }
        
        @media (prefers-color-scheme: dark) {
            .email-content::before {
                background-color: rgba(30, 30, 30, 0.9);
            }
        }
        
        .info-group {
            margin-bottom: 28px;
            position: relative;
        }
        
        .info-group:last-child {
            margin-bottom: 0;
        }
        
        .info-label {
            font-weight: 700;
            color: #000000;
            margin-bottom: 10px;
            display: block;
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @media (prefers-color-scheme: dark) {
            .info-label {
                color: #FFFFFF;
            }
        }
        
        .info-value {
            margin: 0;
            background-color: #E8E8E8;
            padding: 14px 18px;
            border-radius: 8px;
            font-size: 16px;
            color: #000000;
            word-wrap: break-word;
            position: relative;
        }
        
        @media (prefers-color-scheme: dark) {
            .info-value {
                background-color: #2c2c2c;
                color: #FFFFFF;
            }
        }
        
        .message-value {
            white-space: pre-line;
            line-height: 1.8;
        }
        
        .email-footer {
            background-color: #E0E0E0;
            padding: 18px 24px;
            text-align: center;
            font-size: 14px;
            color: #000000;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 1;
        }
        
        @media (prefers-color-scheme: dark) {
            .email-footer {
                background-color: #2c2c2c;
                color: #FFFFFF;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
        
        a {
            color: #000000;
            text-decoration: none;
            font-weight: normal;
        }
        
        @media (prefers-color-scheme: dark) {
            a {
                color: #FFFFFF;
            }
        }
        
        /* Only footer links should be special */
        .email-footer a {
            color: #444444;
            font-weight: 700;
            transition: all 0.2s ease;
        }
        
        @media (prefers-color-scheme: dark) {
            .email-footer a {
                color: #BBBBBB;
            }
        }
        
        .email-footer a:hover {
            text-decoration: underline;
        }
        
        @media only screen and (max-width: 480px) {
            .email-header {
                padding: 20px 16px;
            }
            .email-content {
                padding: 28px 16px;
            }
            .info-value {
                font-size: 15px;
                padding: 12px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="email-header">
                <h1>Astra UI Submission</h1>
            </div>
            
            <div class="email-content">
                <div class="info-group">
                    <span class="info-label">From</span>
                    <p class="info-value">${name} ${lastName}</p>
                </div>

                <div class="info-group">
                    <span class="info-label">Email Address</span>
                    <p class="info-value">${email}</p>
                </div>

                <div class="info-group">
                    <span class="info-label">Message</span>
                    <p class="info-value message-value">${message.replace(
            /\n/g,
            "<br />"
        )}</p>
                </div>
                
                <div class="info-group">
                    <span class="info-label">Submitted On</span>
                    <p class="info-value">${formattedDate}</p>
                </div>
            </div>
            
            <div class="email-footer">
                <p>This message was sent from the contact form on <a href="https://astraui.me">astraui.me</a></p>
            </div>
        </div>
    </div>
</body>
</html>`;

        // Create plain text version for email clients that don't support HTML
        const textContent = `
New Astra UI Submission

From: ${name} ${lastName}
Email: ${email}

Message:
${message}

Submitted on: ${formattedDate}

This message was sent from the contact form on astraui.me
`;

        // Send email
        const { error } = await resend.emails.send({
            from: "Astra UI <contact@egeuysal.com>",
            to: [adminEmail, email],
            subject: `Astra UI Submission from ${name} ${lastName}`,
            replyTo: email,
            text: textContent,
            html: htmlContent,
        });

        if (error) {
            console.error("Error sending email:", error);
            return NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}