/* =====================================================
   KALEIGH BAPTISM INVITATION
   MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   TYPEWRITER
   ===================================================== */

const typingElement = document.getElementById("typing");

const typingText = "A Beautiful Blessing";

let typingIndex = 0;

function typeWriter() {

    if (!typingElement) {
        return;
    }

    if (typingIndex < typingText.length) {

        typingElement.innerHTML += typingText.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeWriter, 90);

    }

}

window.addEventListener("load", function () {

    typeWriter();

});


/* =====================================================
   LOADER / OPEN INVITATION
   ===================================================== */

const loader = document.getElementById("loader");

const envelopeScreen = document.getElementById("envelopeScreen");

const hero = document.getElementById("hero");

const enterButton = document.getElementById("enterButton");


if (enterButton) {

    enterButton.addEventListener("click", function () {

        /*
         * Fade out the opening loader.
         */

        if (loader) {

            loader.style.opacity = "0";

            setTimeout(function () {

                loader.style.display = "none";

                /*
                 * Show the envelope after
                 * the loader disappears.
                 */

                if (envelopeScreen) {

                    envelopeScreen.style.display = "flex";

                    envelopeScreen.style.opacity = "1";

                }

            }, 800);

        }

    });

}


/* =====================================================
   ENVELOPE OPENING
   ===================================================== */

const envelope = document.querySelector(".envelope");


if (envelope) {

    envelope.addEventListener("click", function () {

        /*
         * Trigger envelope CSS animation.
         */

        this.classList.add("open");


        /*
         * Begin fading the envelope screen.
         */

        setTimeout(function () {

            if (envelopeScreen) {

                envelopeScreen.style.opacity = "0";

            }

        }, 1500);


        /*
         * Remove envelope screen and
         * reveal the invitation.
         */

        setTimeout(function () {

            if (envelopeScreen) {

                envelopeScreen.style.display = "none";

            }

            if (hero) {

                hero.style.display = "block";

            }


            /*
             * Enable page scrolling.
             */

            document.body.style.overflow = "auto";


            /*
             * Start invitation at the top.
             */

            window.scrollTo({

                top: 0,

                behavior: "instant"

            });

        }, 2200);

    });

}


/* =====================================================
   FADE-IN SECTIONS
   ===================================================== */

const fadeSections = document.querySelectorAll(".fade");


if (fadeSections.length > 0) {

    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    fadeSections.forEach(function (section) {

        observer.observe(section);

    });

}


/* =====================================================
   NAME STORY BOOK ANIMATION
   ===================================================== */

const books = document.querySelectorAll(".book");


if (books.length > 0) {

    const bookObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.animate(

                        [
                            {
                                opacity: 0,
                                transform: "translateY(80px) scale(.97)"
                            },

                            {
                                opacity: 1,
                                transform: "translateY(0) scale(1)"
                            }
                        ],

                        {
                            duration: 1400,
                            fill: "forwards",
                            easing: "ease"
                        }

                    );


                    bookObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    books.forEach(function (book) {

        book.style.opacity = "0";

        bookObserver.observe(book);

    });

}


/* =====================================================
   GALLERY
   ===================================================== */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

const prevPhoto = document.getElementById("prevPhoto");

const nextPhoto = document.getElementById("nextPhoto");

let currentPhoto = 0;


/* =====================================================
   GALLERY FADE ANIMATION
   ===================================================== */

if (galleryItems.length > 0) {

    const galleryGrid =
        document.querySelector(".gallery-grid");


    if (galleryGrid) {

        const galleryObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            galleryItems.forEach(
                                function (photo, index) {

                                    setTimeout(
                                        function () {

                                            photo.classList.add("show");

                                        },
                                        index * 150
                                    );

                                }
                            );


                            galleryObserver.unobserve(entry.target);

                        }

                    });

                },

                {
                    threshold: 0.2
                }

            );


        galleryObserver.observe(galleryGrid);

    }

}


/* =====================================================
   GALLERY LIGHTBOX
   ===================================================== */

function showPhoto() {

    if (!lightboxImage) {
        return;
    }

    if (galleryItems.length === 0) {
        return;
    }

    lightboxImage.src =
        galleryItems[currentPhoto].src;

    lightboxImage.alt =
        galleryItems[currentPhoto].alt || "Gallery photo";

}


/*
 * Open lightbox when a photo is clicked.
 */

galleryItems.forEach(function (photo, index) {

    photo.addEventListener("click", function () {

        currentPhoto = index;

        showPhoto();


        if (lightbox) {

            lightbox.style.display = "flex";

        }


        document.body.style.overflow = "hidden";

    });

});


/*
 * Next photo.
 */

if (nextPhoto) {

    nextPhoto.addEventListener("click", function (event) {

        event.stopPropagation();

        currentPhoto++;


        if (currentPhoto >= galleryItems.length) {

            currentPhoto = 0;

        }


        showPhoto();

    });

}


/*
 * Previous photo.
 */

if (prevPhoto) {

    prevPhoto.addEventListener("click", function (event) {

        event.stopPropagation();

        currentPhoto--;


        if (currentPhoto < 0) {

            currentPhoto =
                galleryItems.length - 1;

        }


        showPhoto();

    });

}


/*
 * Close lightbox button.
 */

if (closeLightbox) {

    closeLightbox.addEventListener("click", function () {

        if (lightbox) {

            lightbox.style.display = "none";

        }

        document.body.style.overflow = "auto";

    });

}


/*
 * Close lightbox when clicking
 * outside the image.
 */

if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            lightbox.style.display = "none";

            document.body.style.overflow = "auto";

        }

    });

}


/*
 * Keyboard controls for lightbox.
 */

document.addEventListener("keydown", function (event) {

    if (!lightbox) {
        return;
    }


    if (lightbox.style.display !== "flex") {
        return;
    }


    if (event.key === "Escape") {

        lightbox.style.display = "none";

        document.body.style.overflow = "auto";

    }


    if (event.key === "ArrowRight") {

        currentPhoto++;

        if (currentPhoto >= galleryItems.length) {

            currentPhoto = 0;

        }

        showPhoto();

    }


    if (event.key === "ArrowLeft") {

        currentPhoto--;

        if (currentPhoto < 0) {

            currentPhoto =
                galleryItems.length - 1;

        }

        showPhoto();

    }

});


/* =====================================================
   BIRTH CARDS
   ===================================================== */

const birthCards =
    document.querySelectorAll(".birth-card");


if (birthCards.length > 0) {

    const birthGrid =
        document.querySelector(".birth-grid");


    if (birthGrid) {

        const birthObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            birthCards.forEach(
                                function (card, index) {

                                    setTimeout(
                                        function () {

                                            card.classList.add("show");

                                        },
                                        index * 180
                                    );

                                }
                            );


                            birthObserver.unobserve(entry.target);

                        }

                    });

                },

                {
                    threshold: 0.25
                }

            );


        birthObserver.observe(birthGrid);

    }

}


/* =====================================================
   COUNTDOWN
   ===================================================== */

/*
 * Baptism date:
 *
 * October 31, 2026
 * 10:00 AM
 * UTC+8
 *
 * Using an explicit timezone prevents the countdown
 * from changing depending on the visitor's location.
 */

const targetDate =
    new Date(
        "2026-10-31T10:00:00+08:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        targetDate - now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    /*
     * Stop if countdown elements
     * don't exist.
     */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    /*
     * Event has arrived.
     */

    if (distance <= 0) {

        daysElement.textContent = "00";

        hoursElement.textContent = "00";

        minutesElement.textContent = "00";

        secondsElement.textContent = "00";

        return;

    }


    /*
     * Calculate remaining time.
     */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    /*
     * Update countdown display.
     */

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


/*
 * Run immediately.
 */

updateCountdown();


/*
 * Update every second.
 */

setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   TIMELINE
   ===================================================== */

const timelineItems =
    document.querySelectorAll(".timeline-item");


if (timelineItems.length > 0) {

    const timelineObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        timelineObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.25
            }

        );


    timelineItems.forEach(function (item) {

        timelineObserver.observe(item);

    });

}


/* =====================================================
   RSVP
   ===================================================== */

const rsvpForm =
    document.getElementById("rsvpForm");

const successPopup =
    document.getElementById("successPopup");

const closePopupButton =
    document.getElementById("closePopupButton");


/*
 * RSVP submission.
 */

if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function (event) {

            /*
             * Prevent browser refresh.
             */

            event.preventDefault();


            /*
             * Show success popup.
             */

            if (successPopup) {

                successPopup.classList.add("show");

            }


            /*
             * Clear form fields.
             */

            rsvpForm.reset();

        }
    );

}


/* =====================================================
   RSVP POPUP
   ===================================================== */

function closePopup() {

    if (successPopup) {

        successPopup.classList.remove("show");

    }

}


/*
 * Make function available globally
 * in case the HTML needs it.
 */

window.closePopup =
    closePopup;


/*
 * Close button.
 */

if (closePopupButton) {

    closePopupButton.addEventListener(
        "click",
        function () {

            closePopup();

        }
    );

}


/*
 * Close popup when clicking
 * outside the popup content.
 */

if (successPopup) {

    successPopup.addEventListener(
        "click",
        function (event) {

            if (
                event.target === successPopup
            ) {

                closePopup();

            }

        }
    );

}


/*
 * Close popup with Escape.
 */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                successPopup &&
                successPopup.classList.contains("show")
            ) {

                closePopup();

            }

        }

    }
);


/* =====================================================
   MUSIC PLAYER
   ===================================================== */

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicBtn");

let musicPlaying = false;


if (musicButton && bgMusic) {

    musicButton.addEventListener(
        "click",
        function () {

            /*
             * Pause music.
             */

            if (musicPlaying) {

                bgMusic.pause();

                musicButton.innerHTML = "♪";

                musicButton.setAttribute(
                    "aria-label",
                    "Play background music"
                );

                musicPlaying = false;

            }


            /*
             * Play music.
             */

            else {

                bgMusic.play()

                    .then(function () {

                        musicButton.innerHTML = "❚❚";

                        musicButton.setAttribute(
                            "aria-label",
                            "Pause background music"
                        );

                        musicPlaying = true;

                    })

                    .catch(function (error) {

                        console.log(
                            "Music could not be played:",
                            error
                        );

                    });

            }

        }
    );

}


/* =====================================================
   SCROLL PROGRESS BAR
   ===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const progressBar =
            document.getElementById(
                "progressBar"
            );


        if (!progressBar) {
            return;
        }


        const winScroll =
            document.documentElement.scrollTop;


        const height =
            document.documentElement.scrollHeight
            -
            document.documentElement.clientHeight;


        if (height > 0) {

            const progress =
                (winScroll / height) * 100;


            progressBar.style.width =
                progress + "%";

        }

    }
);


/* =====================================================
   BACK TO TOP BUTTON
   ===================================================== */

const topButton =
    document.getElementById("topBtn");


if (topButton) {

    /*
     * Hide button initially.
     */

    topButton.style.display = "none";


    /*
     * Show after scrolling.
     */

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                topButton.style.display =
                    "block";

            }

            else {

                topButton.style.display =
                    "none";

            }

        }
    );


    /*
     * Scroll to top.
     */

    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   INITIALIZE PAGE
   ===================================================== */

/*
 * Make sure the page starts with scrolling disabled
 * while the opening loader/envelope experience is active.
 */

if (loader || envelopeScreen) {

    document.body.style.overflow = "hidden";

}


/*
 * Set initial hero state.
 *
 * The hero will become visible after the envelope opens.
 */

if (hero) {

    hero.style.display = "block";

}
