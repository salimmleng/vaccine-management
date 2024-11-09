
    const loadReviews = () => {
        fetch("https://vaccine-pi.vercel.app/vaccine/reviews/")
            .then((response) => response.json())
            .then((data) => {
                const reviewWrapper = document.getElementById("review-swiper-wrapper");
                data.forEach((review) => {

                    const slide = document.createElement("div");
                    slide.classList.add("swiper-slide");

                    slide.innerHTML = `
                        <div class="review-card">
                            <img src="static/images/rev.png" class="img-fluid reviewer-img" alt="Reviewer 1">
                            <div class="review-text">
                                <p class="review-content">Review:
                                    "${review.comment}"
                                </p>
                                <h5 class="reviewer-name">Reviewer:  ${review.reviewer.first_name}</h5>
                                <p class="reviewer-title">${review.rating}</p>
                            </div>
                        </div>
                    `;

                    // Append the slide to the Swiper wrapper
                    reviewWrapper.appendChild(slide);
                });
  
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    };

   
loadReviews();

