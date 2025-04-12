import React from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";

interface FeaturesProps {
    icon: React.ReactNode;
    featureName: string;
    featureDesc: string;
}

const iconSize = 32;

const speedIcon = React.createElement(IoMdSpeedometer, { size: iconSize });
const moneyIcon = React.createElement(RiMoneyDollarCircleLine, { size: iconSize });
const cloudIcon = React.createElement(TbBrandNextjs, { size: iconSize });
const penIcon = React.createElement(MdOutlineDesignServices, { size: iconSize });

const features: FeaturesProps[] = [
    {
        icon: speedIcon,
        featureName: "Blazing speed",
        featureDesc: "Delivering unparalleled performance that ensures tasks are completed swiftly with utmost efficiency."
    },
    {
        icon: moneyIcon,
        featureName: "Free forever",
        featureDesc: "Enjoy lifetime access to all features at no cost, empowering developers without financial barriers."
    },
    {
        icon: cloudIcon,
        featureName: "Cross-platform",
        featureDesc: "Seamlessly operates on diverse platforms, providing consistent functionality across environments."
    },
    {
        icon: penIcon,
        featureName: "Highly customizable",
        featureDesc: "Adapt every aspect to meet unique requirements, offering unmatched flexibility for all use cases."
    }
];

export default features;