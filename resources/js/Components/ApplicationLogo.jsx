export default function ApplicationLogo(props) {
    return (
        <>
            <img
                {...props}
                src="/image/darklogo.png"
                alt="Logo"
                className="hidden dark:block w-[150px] sm:w-[150px] md:w-[150px] lg:w-[160px] xl:w-[180px] h-[40px] sm:h-[55px] object-contain"
            />
            <img
                {...props}
                src="/image/white-logo.png"
                alt="Logo"
                className="dark:hidden block w-[150px] sm:w-[150px] md:w-[150px] lg:w-[160px] xl:w-[180px] h-[40px] sm:h-[55px] object-contain"
            />
        </>
    );
}
