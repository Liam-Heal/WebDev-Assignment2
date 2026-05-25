MelbEats - Restaurant Discovery & Reservation Platform
COS10005 Web Development - Assignment 2
Liam Healey
Swinburne University of Technology, 2026

---

Folder Structure:

assignment2/
├── index.html          Home page - introduces the platform
├── restaurants.html    Restaurant listing page - six restaurants with full details
├── recommend.html      Recommendation page - form-based matching to a restaurant
├── register.html       Registration page - account creation form with JS validation
├── reservation.html    Reservation page - booking form with deposit and payment logic
├── bill.html           Bonus - estimated bill calculator
├── css/
│   └── style.css       Single external stylesheet, applied to all pages
├── js/
│   └── script.js       Single external JS file, applied to all pages
├── images/             All images used across the site
└── Readme.txt          This file

--------

GitHub Repository: https://github.com/Liam-Heal/WebDev-Assignment2

------

JavaScript Validation Logic

Registration form (validateRegister):
- Username: checks length is at least 5, then checks it only contains letters, numbers, and underscores using a regex test
- Email: checks the input matches a basic email format (something@something.something) using regex
- Phone: checks digits only and between 8 and 15 characters using regex
- Password: checks length first (min 10), then separately checks for uppercase, lowercase, number, and special character using regex tests
- Confirm password: compares the value directly to the password field value
- Gender: loops through all radio inputs with name="gender" and checks if any are checked
- Dietary and Country: checks the select value is not empty
- All errors are shown in a span element next to the relevant field. The function returns false if any check fails, which blocks form submission.

Reservation form (validateReservation):
- Full name: checks the trimmed value is not empty
- Email: same regex check as registration
- Phone: digits only, minimum 10 digits
- Restaurant: checks the select value is not empty
- Date: checks the input is not empty, then compares the selected datetime to the current datetime using Date objects
- Number of people: parses the value as an integer and checks it is at least 1
- Payment method: checks the select value is not empty
- If online payment is selected, card type is checked first, then card number length is checked against the expected length for that card type (15 for Amex, 16 for Visa/Mastercard)
- Billing email: same regex check as email above
- All errors shown in span elements. Returns false if any check fails.

Dynamic behaviour:
- updateDeposit: reads the data-deposit attribute from the selected restaurant option and displays it
- togglePaymentFields: shows or hides the voucher or card fields based on the payment method selected, using classList to add or remove the hidden class
- updateCardHint: updates the placeholder and maxlength of the card number input based on the selected card type
- copyEmail: copies the reservation email value into the billing email field when the checkbox is checked, and sets the field to readOnly
- prefillRestaurant: reads a restaurant name from the URL query string on page load and sets the restaurant dropdown to that value if it exists
- getRecommendation: reads the three preference inputs and runs through a set of if/else rules to pick a matching restaurant, then displays the result and a link to the reservation page
- updateBillEstimate: reads the selected restaurant data attributes and the people input, multiplies the min and max price per person by the group size, and displays the result

----

References

image1.jpg - https://www.cntraveller.com/article/melbourne-restaurants
image2.jpg - https://www.tripadvisor.com/Restaurant_Review-g255100-d10198460-Reviews-Sushi_Hub_Swanston-Melbourne_Victoria.html
image3.jpg - https://medium.com/@rakesh.indiacreatives/best-butter-chicken-in-melbourne-31795c2a7e95
image4.jpg - https://www.thegreenbowl.com.au/
image5.jpg - https://www.ivanhoetavern.com.au/grill/
image6.jpg - https://sitchu.com.au/melbourne/restaurants/best-pho-melbourne
image7.jpg - https://www.tripadvisor.com.au/Restaurant_Review-g2091978-d15604939-Reviews-Piccolino_Woodfired_Pizza_Homemade_Pasta_Italian_Restaurant-North_Fitzroy_Yarra.html
