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
        <div className="bg-muted rounded-lg px-4 py-2 w-full">
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
