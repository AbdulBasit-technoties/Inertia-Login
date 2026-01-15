import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children, brand }) {
    return (
        <div className="sm:flex flex-wrap justify-center dark:bg-[#17212e] bg-custbg sm:items-center py-[50px] lg:py-[0px] h-screen sm:h-fit lg:h-screen">
            <div className="mx-auto w-[90%] lg:w-[90%] xl:w-[80%] sm:flex dark:bg-primary flex-wrap sm:items-center shadow-lg bg-white rounded overflow-hidden">
                <div className="lg:w-[50%] xl:w-[60%] h-fit sm:h-auto">
                    <img
                        src="/image/login.jpg"
                        alt="Logo"
                        className="h-auto lg:h-[600px] 2xl:h-[650px] object-cover"
                    />
                </div>
                <div className="w-full lg:w-[50%] xl:w-[40%] py-[30px] px-[20px] sm:p-[40px] 2xl:p-[50px]">
                    <div className="flex justify-center mb-[20px]">
                        {brand ? (
                            <img
                                src={
                                    brand.logo
                                        ? brand.logo
                                        : "/image/no-image.webp"
                                }
                                alt={brand.name}
                                className="w-[150px] sm:w-[180px] 2xl:w-[220px]"
                            />
                        ) : (
                            <>
                                <img
                                    src="/image/white-logo.png"
                                    className="dark:hidden w-[150px] sm:w-[180px] 2xl:w-[220px]"
                                    alt="Default Logo"
                                />
                                <img
                                    src="/image/darklogo.png"
                                    className="hidden dark:block w-[150px] sm:w-[180px] 2xl:w-[220px]"
                                    alt="Dark Logo"
                                />
                            </>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
