
// import "../public/css/404/"

export default function PageNotFound() {
    return (
        <>
            <section id="main" className="section-main">
                <div className="container-fluid p-0 fullheight">
                    <div className="row g-0 fullheight">
                        {/* Main Section Intro Start */}
                        <div id="intro" className="col-12 col-xl-9 section-main__intro">
                            {/* Intro Media Start */}
                            <div className="intro__media">
                                {/* Main Section Image Background Start */}
                                <div className="media__image media-5" />
                                {/* Main Section Image Background End */}
                                {/* Floating Clouds Background Start*/}
                                <div id="clouds">
                                    <div className="clouds__layer clouds__layer1">
                                        <img
                                            src="img/backgrounds/clouds-layers/layer-1.png"
                                            alt="Axio Template Clouds Background Image"
                                        />
                                    </div>
                                    <div className="clouds__layer clouds__layer2">
                                        <img
                                            src="img/backgrounds/clouds-layers/layer-2.png"
                                            alt="Axio Template Clouds Background Image"
                                        />
                                    </div>
                                    <div className="clouds__layer clouds__layer3">
                                        <img
                                            src="img/backgrounds/clouds-layers/layer-3.png"
                                            alt="Axio Template Clouds Background Image"
                                        />
                                    </div>
                                </div>
                                {/* Floating Clouds Background Start End*/}
                                {/* Main Section Color Layer Start */}
                                <div className="color-layer color-layer-medium" />
                                {/* Main Section Color Layer End */}
                            </div>
                            {/* Intro Media End */}
                            {/* Intro Header Start */}
                            <div className="intro__header">
                                {/* Logo Start */}
                                <div className="logo">
                                    <img
                                        src="img/axio-logo.svg"
                                        alt="Axio - awesome coming soon template to kick-start your project"
                                    />
                                </div>
                                {/* Logo End */}
                                {/* Menu Trigger Start - Visible on Mobile */}
                                <a href="#0" id="menu-trigger" className="menu-trigger">
                                    <i className="fa-solid fa-bars" />
                                </a>
                                {/* Menu Trigger End - Visible on Mobile */}
                            </div>
                            {/* Intro Header End */}
                            {/* Navigation Start */}
                            <div id="menu" className="menu">
                                {/* Navigation Controls Start - Visible on Mobile */}
                                <div className="menu__controls">
                                    <a href="#0" id="menu-close" className="menu-close section-close">
                                        <i className="fa-solid fa-xmark" />
                                    </a>
                                </div>
                                {/* Navigation Controls End - Visible on Mobile */}
                                {/* Navigation Menu Start */}
                                <div className="menu__container">
                                    <nav className="navigation">
                                        <ul>
                                            <li className="transition-el transition-el-1">
                                                <a href="#" id="home-trigger" className="home-trigger">
                                                    Home
                                                </a>
                                            </li>
                                            <li className="transition-el transition-el-2">
                                                <a href="#" id="about-trigger" className="inner-trigger">
                                                    About us
                                                </a>
                                            </li>
                                            <li className="transition-el transition-el-3">
                                                <a href="#" id="works-trigger" className="inner-trigger">
                                                    Our works
                                                </a>
                                            </li>
                                            <li className="transition-el transition-el-4">
                                                <a href="#" id="contact-trigger" className="inner-trigger">
                                                    Contact
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                {/* Navigation Menu End */}
                            </div>
                            {/* Navigation End */}
                            {/* Intro Headline Start */}
                            <div className="intro__headline">
                                <p className="headline__subtitle">We are</p>
                                {/* Animated Headline Start */}
                                <h1 className="headline__title clip">
                                    <span className="words-wrapper">
                                        <b className="is-visible">Experience</b>
                                        <b>Adventure</b>
                                        <b>Coming soon</b>
                                    </span>
                                </h1>
                                {/* Animated Headline End */}
                                <p className="headline__description">
                                    We are preparing something amazing and exciting for you. Special
                                    surprise for our subscribers only.
                                </p>
                                <div className="headline__btnholder">
                                    <a
                                        href="#"
                                        className="button button-solid-light"
                                        id="notify-trigger"
                                    >
                                        <span className="button-caption">Notify me</span>
                                    </a>
                                </div>
                            </div>
                            {/* Intro Headline End */}
                            {/* Intro Countdown Start */}
                            <div className="intro__countdown">
                                <div className="countdown">
                                    <div id="countdown" />
                                    <span className="help-text">
                                        days
                                        <br />
                                        to launch
                                    </span>
                                </div>
                            </div>
                            {/* Intro Countdown End */}
                            {/* Intro Сopyright Start */}
                            <div className="intro__copyright">
                                <p className="copyright">
                                    made with
                                    <i className="fa-solid fa-heart" />
                                    by
                                    <a href="https://themeforest.net/user/mix_design" target="_blank">
                                        mix_design
                                    </a>
                                </p>
                            </div>
                            {/* Intro Сopyright End */}
                        </div>
                        {/* Main Section Intro End */}
                        {/* Main Section Aside Start */}
                        <div className="col-12 col-xl-3 section-main__aside">
                            {/* Aside Content Start */}
                            <div className="aside__content">
                                <p className="aside__title">
                                    Our website is under construction, but we are ready to go!
                                </p>
                                <p className="aside__text">
                                    Want to know more about us, tell us about your project or just to
                                    say hello? Drop us a line and we will get back as soon as possible.
                                </p>
                                <a
                                    href="#0"
                                    id="stayintouch-trigger"
                                    className="button button-outline-light"
                                >
                                    <span className="button-caption">Write a line</span>
                                </a>
                            </div>
                            {/* Aside Content End */}
                            {/* Aside Socials Start */}
                            <div className="aside__socials">
                                <ul className="socials">
                                    <li>
                                        <a href="https://www.instagram.com/" target="_blank">
                                            <i className="fa-brands fa-instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://dribbble.com/" target="_blank">
                                            <i className="fa-brands fa-dribbble" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.behance.net/" target="_blank">
                                            <i className="fa-brands fa-behance" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank">
                                            <i className="fa-brands fa-facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/" target="_blank">
                                            <i className="fa-brands fa-twitter" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* Aside Socials End */}
                            {/* Stay-in-Touch Popup Start */}
                            <div id="stayintouch" className="stayintouch">
                                {/* Stay-in-touch Controls Start */}
                                <div className="stayintouch__controls">
                                    <a
                                        className="button-square button-outline-light section-close"
                                        href="#0"
                                        id="stayintouch-close"
                                    >
                                        <i className="fa-solid fa-xmark" />
                                    </a>
                                </div>
                                {/* Stay-in-touch Controls End */}
                                {/* Stay-in-touch Content Start */}
                                <div className="stayintouch__content">
                                    {/* Stay-in-touch Content Block Title Start */}
                                    <div className="content-block margin-bottom-s">
                                        <p className="popup__title light transition-el transition-el-1">
                                            Stay in touch
                                        </p>
                                    </div>
                                    {/* Stay-in-touch Content Block Title End */}
                                    {/* Stay-in-touch Content Block Form Start */}
                                    <div className="content-block grid-block">
                                        <div className="form-container">
                                            {/* Reply Messages Start */}
                                            <div className="reply-group">
                                                <i className="fa-solid fa-circle-check reply-group__icon light" />
                                                <p className="reply-group__title light">Done!</p>
                                                <span className="reply-group__text light">
                                                    Thanks for your message. We will get back as soon as
                                                    possible.
                                                </span>
                                            </div>
                                            {/* Reply Messages End */}
                                            {/* Stay-in-touch Form Start */}
                                            <form
                                                className="form form-light stayintouch-form"
                                                id="stayintouch-form"
                                            >
                                                {/* Hidden Required Fields */}
                                                <input
                                                    type="hidden"
                                                    name="project_name"
                                                    defaultValue="Axio Coming Soon Template"
                                                />
                                                <input
                                                    type="hidden"
                                                    name="admin_email"
                                                    defaultValue="support@mixdesign.club"
                                                />
                                                <input
                                                    type="hidden"
                                                    name="form_subject"
                                                    defaultValue="Stay-in-touch Form Message"
                                                />
                                                {/* END Hidden Required Fields*/}
                                                <div className="container-fluid px-4">
                                                    <div className="row gx-5">
                                                        <div className="col-12">
                                                            <input
                                                                className="transition-el transition-el-2"
                                                                type="text"
                                                                name="Name"
                                                                placeholder="Your Name*"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <input
                                                                className="transition-el transition-el-3"
                                                                type="email"
                                                                name="E-mail"
                                                                placeholder="Email Adress*"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <textarea
                                                                className="transition-el transition-el-4"
                                                                name="Message"
                                                                placeholder="Your Message*"
                                                                required=""
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="inputs-description opacity-el opacity-el-1">
                                                                *Required fields
                                                            </span>
                                                            <button className="button button-solid-light transition-el transition-el-5">
                                                                <span className="button-caption">Send</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            {/* Stay-in-touch Form End */}
                                        </div>
                                    </div>
                                    {/* Stay-in-touch Content Block Form End */}
                                </div>
                                {/* Stay-in-touch Content End */}
                            </div>
                            {/* Stay-in-Touch Popup End */}
                        </div>
                        {/* Main Section Aside End */}
                    </div>
                </div>
            </section>

        </>
    )
}