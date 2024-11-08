"use client";

import React, { useState, useEffect } from "react";
import { IconType } from "react-icons";

interface IconProps {
    iconName: string;
    library: string;
    color?:string,
    size?:number
}

const DynamicIcon: React.FC<IconProps> = ({ iconName, library , size = 20,color = "#F40035" }) => {
    const [IconComponent, setIconComponent] = useState<IconType | null>(null);


    useEffect(() => {
        const loadIcon = async () => {
            try {
                let iconPackage: Record<string, IconType>;
                switch (library) {
                    case "fa":
                        iconPackage = await import("react-icons/fa").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "fa6":
                        iconPackage = await import("react-icons/fa6").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "ai":
                        iconPackage = await import("react-icons/ai").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "bs":
                        iconPackage = await import("react-icons/bs").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "bi":
                        iconPackage = await import("react-icons/bi").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "ci":
                        iconPackage = await import("react-icons/ci").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "cg":
                        iconPackage = await import("react-icons/cg").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "di":
                        iconPackage = await import("react-icons/di").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "fc":
                        iconPackage = await import("react-icons/fc").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "fi":
                        iconPackage = await import("react-icons/fi").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "gi":
                        iconPackage = await import("react-icons/gi").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "go":
                        iconPackage = await import("react-icons/go").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "gr":
                        iconPackage = await import("react-icons/gr").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "hi":
                        iconPackage = await import("react-icons/hi").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "hi2":
                        iconPackage = await import("react-icons/hi2").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "im":
                        iconPackage = await import("react-icons/im").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "io":
                        iconPackage = await import("react-icons/io").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "io5":
                        iconPackage = await import("react-icons/io5").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "lia":
                        iconPackage = await import("react-icons/lia").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "lu":
                        iconPackage = await import("react-icons/lu").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "md":
                        iconPackage = await import("react-icons/md").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "pi":
                        iconPackage = await import("react-icons/pi").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "ri":
                        iconPackage = await import("react-icons/ri").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "rx":
                        iconPackage = await import("react-icons/rx").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "si":
                        iconPackage = await import("react-icons/si").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "sl":
                        iconPackage = await import("react-icons/sl").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "tb":
                        iconPackage = await import("react-icons/tb").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "ti":
                        iconPackage = await import("react-icons/ti").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "tfi":
                        iconPackage = await import("react-icons/tfi").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "vsc":
                        iconPackage = await import("react-icons/vsc").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    case "wi":
                        iconPackage = await import("react-icons/wi").then(
                            (module) =>
                                module as unknown as Record<string, IconType>
                        );
                        break;
                    default:
                        throw new Error(
                            `Library '${library}' is not supported.`
                        );
                }

                const Icon = iconPackage[iconName];
                if (!Icon) {
                    throw new Error(
                        `Icon '${iconName}' not found in library '${library}'`
                    );
                }
                setIconComponent(() => Icon);
            } catch (error) {
                console.error(error);
            }
        };

        loadIcon();
    }, [iconName, library]);

    if (!IconComponent) {
        return <span></span>;
    }

    return <IconComponent color={color} size={size}  className="h-[15] w-[10] "  /> as JSX.Element;;
};

export default DynamicIcon;
