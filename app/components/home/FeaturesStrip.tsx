import { ShieldCheck, BarChart3, Users, HeartHandshake } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        text: "Protección integral para ti y tu familia",
    },
    {
        icon: BarChart3,
        text: "Asesoría financiera personalizada",
    },
    {
        icon: Users,
        text: "Cobertura integral para colaboradores",
    },
    {
        icon: HeartHandshake,
        text: "Acompañamiento confiable",
    },
];

export default function FeaturesStrip() {
    return (
        <div className="relative -mt-16 md:-mt-24 z-20 container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-[#1E2025]/95 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`
              flex items-center gap-4 p-6
              ${index % 2 !== 0 ? "sm:border-r-0" : "sm:border-r"}
              ${index < 2 ? "sm:border-b" : ""}
              md:border-b-0 md:border-r last:border-0 border-white/10
              hover:bg-white/5 transition-colors duration-300 group
            `}
                    >
                        <feature.icon className="w-8 h-8 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <p className="text-xs md:text-sm font-medium text-gray-300 leading-tight">
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
