export default function ApplicationLogo(props) {
    return (
        <>
            <img
                {...props}
                src="/image/darklogo.png"
                alt="Logo"
                className="hidden dark:block h-[40px] 2xl:h-[50px] object-contain"
            />
            <img
                {...props}
                src="/image/white-logo.png"
                alt="Logo"
                className="dark:hidden block h-[40px] 2xl:h-[50px] object-contain"
            />
        </>
    );
}
