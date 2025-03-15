export default function CountBoxDashboardComponent({
    children,
    heading,
    count,
}: Readonly<{
    children: React.ReactElement;
    heading: string;
    count: number;
}>) {
    return (
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg px-4 py-2 w-full shadow-sm shadow-gray-400/70">
            <div className="flex justify-start items-center space-x-4">
                {children}
                <div className="text-right flex flex-col justify-center items-start">
                    <h3 className="text-md font-sans">{heading}</h3>
                    <p className="text-lg font-bold">{count}</p>
                </div>
            </div>
        </div>
    );
}
