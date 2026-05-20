// restaurant data - deposit amounts keyed by name
const restaurantDeposits = {
    "Sakura Japanese Kitchen": 20,
    "Tandoor House": 15,
    "Green Bowl": 10,
    "The Steak Room": 40,
    "Pho Saigon": 10,
    "Lupa Trattoria": 20
};

// recommendation logic - maps dietary/budget/purpose to a restaurant
function getRecommendation() {
    const dietary = document.getElementById("dietary").value;
    const budget = document.getElementById("budget").value;
    const purpose = document.getElementById("purpose").value;

    const resultBox = document.getElementById("resultBox");
    const resultText = document.getElementById("resultText");
    const resultLink = document.getElementById("resultLink");
    const noResult = document.getElementById("noResult");

    // hide previous results
    resultBox.classList.add("hidden");
    noResult.classList.add("hidden");

    if (!dietary || !budget || !purpose) {
        noResult.textContent = "Please select all three options before getting a recommendation.";
        noResult.classList.remove("hidden");
        return;
    }

    let match = null;

    // rule-based matching - dietary takes priority, then budget, then purpose
    if (dietary === "vegan") {
        match = "Green Bowl";
    } else if (dietary === "halal") {
        match = "Tandoor House";
    } else if (budget === "high") {
        match = "The Steak Room";
    } else if (budget === "low" && purpose === "casual") {
        match = "Pho Saigon";
    } else if (purpose === "family" || purpose === "casual") {
        if (budget === "low") {
            match = "Pho Saigon";
        } else {
            match = "Lupa Trattoria";
        }
    } else if (purpose === "date" || purpose === "business") {
        if (budget === "mid") {
            match = "Sakura Japanese Kitchen";
        } else if (budget === "high") {
            match = "The Steak Room";
        } else {
            match = "Lupa Trattoria";
        }
    } else if (dietary === "glutenfree") {
        match = "Sakura Japanese Kitchen";
    } else {
        match = "Lupa Trattoria";
    }

    if (match) {
        resultText.textContent = "Recommended restaurant: " + match;
        resultLink.href = "reservation.html?restaurant=" + encodeURIComponent(match);
        resultBox.classList.remove("hidden");
    } else {
        noResult.classList.remove("hidden");
    }
}

// deposit display - updates when restaurant is selected on reservation page
function updateDeposit() {
    const select = document.getElementById("restaurant");
    const display = document.getElementById("depositDisplay");

    if (!select || !display) return;

    const selected = select.options[select.selectedIndex];
    const deposit = selected.getAttribute("data-deposit");

    if (deposit) {
        display.textContent = "$" + deposit + " deposit required for this restaurant.";
    } else {
        display.textContent = "Select a restaurant to see the deposit amount.";
    }
}

// payment fields - show voucher or card fields based on selection
function togglePaymentFields() {
    const method = document.getElementById("paymentMethod").value;
    const voucherGroup = document.getElementById("voucherGroup");
    const cardGroup = document.getElementById("cardGroup");
    const cardNumberGroup = document.getElementById("cardNumberGroup");

    if (!voucherGroup || !cardGroup) return;

    if (method === "voucher") {
        voucherGroup.classList.remove("hidden");
        cardGroup.classList.add("hidden");
        cardNumberGroup.classList.add("hidden");
    } else if (method === "online") {
        voucherGroup.classList.add("hidden");
        cardGroup.classList.remove("hidden");
        cardNumberGroup.classList.remove("hidden");
    } else {
        voucherGroup.classList.add("hidden");
        cardGroup.classList.add("hidden");
        cardNumberGroup.classList.add("hidden");
    }
}

// card hint - updates card number placeholder based on card type
function updateCardHint() {
    const cardType = document.getElementById("cardType").value;
    const cardNumber = document.getElementById("cardNumber");

    if (!cardNumber) return;

    if (cardType === "amex") {
        cardNumber.placeholder = "15-digit Amex number";
        cardNumber.maxLength = 15;
    } else if (cardType === "visa" || cardType === "mastercard") {
        cardNumber.placeholder = "16-digit card number";
        cardNumber.maxLength = 16;
    } else {
        cardNumber.placeholder = "Card number";
        cardNumber.removeAttribute("maxlength");
    }
}

// billing email - copies reservation email if checkbox ticked
function copyEmail() {
    const checkbox = document.getElementById("sameEmail");
    const resEmail = document.getElementById("res-email");
    const billingEmail = document.getElementById("billingEmail");

    if (!checkbox || !resEmail || !billingEmail) return;

    if (checkbox.checked) {
        billingEmail.value = resEmail.value;
        billingEmail.readOnly = true;
    } else {
        billingEmail.value = "";
        billingEmail.readOnly = false;
    }
}

// pre-fill restaurant from URL query string
function prefillRestaurant() {
    const params = new URLSearchParams(window.location.search);
    const restaurant = params.get("restaurant");
    const select = document.getElementById("restaurant");

    if (!restaurant || !select) return;

    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === restaurant) {
            select.selectedIndex = i;
            updateDeposit();
            break;
        }
    }
}

// registration form validation
function validateRegister() {
    let valid = true;

    // username - min 5 chars, letters/numbers/underscores only
    const username = document.getElementById("username").value.trim();
    const usernameError = document.getElementById("usernameError");
    if (username.length < 5) {
        usernameError.textContent = "Username must be at least 5 characters.";
        valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        usernameError.textContent = "Username can only contain letters, numbers, and underscores.";
        valid = false;
    } else {
        usernameError.textContent = "";
    }

    // email - basic format check
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    // phone - digits only, 8-15 digits
    const phone = document.getElementById("phone").value.trim();
    const phoneError = document.getElementById("phoneError");
    if (!/^\d{8,15}$/.test(phone)) {
        phoneError.textContent = "Phone number must be digits only, between 8 and 15 digits.";
        valid = false;
    } else {
        phoneError.textContent = "";
    }

    // password - min 10 chars, upper, lower, number, special
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    if (password.length < 10) {
        passwordError.textContent = "Password must be at least 10 characters.";
        valid = false;
    } else if (!/[A-Z]/.test(password)) {
        passwordError.textContent = "Password must contain at least one uppercase letter.";
        valid = false;
    } else if (!/[a-z]/.test(password)) {
        passwordError.textContent = "Password must contain at least one lowercase letter.";
        valid = false;
    } else if (!/[0-9]/.test(password)) {
        passwordError.textContent = "Password must contain at least one number.";
        valid = false;
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
        passwordError.textContent = "Password must contain at least one special character.";
        valid = false;
    } else {
        passwordError.textContent = "";
    }

    // confirm password must match
    const confirmPassword = document.getElementById("confirmPassword").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    if (confirmPassword !== password) {
        confirmPasswordError.textContent = "Passwords do not match.";
        valid = false;
    } else {
        confirmPasswordError.textContent = "";
    }

    // gender must be selected
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderError = document.getElementById("genderError");
    let genderSelected = false;
    genderInputs.forEach(input => {
        if (input.checked) genderSelected = true;
    });
    if (!genderSelected) {
        genderError.textContent = "Please select a gender option.";
        valid = false;
    } else {
        genderError.textContent = "";
    }

    // dietary must be selected
    const dietary = document.getElementById("dietary").value;
    const dietaryError = document.getElementById("dietaryError");
    if (!dietary) {
        dietaryError.textContent = "Please select a dietary preference.";
        valid = false;
    } else {
        dietaryError.textContent = "";
    }

    // country must be selected
    const country = document.getElementById("country").value;
    const countryError = document.getElementById("countryError");
    if (!country) {
        countryError.textContent = "Please select a country or region.";
        valid = false;
    } else {
        countryError.textContent = "";
    }

    return valid;
}

// reservation form validation
function validateReservation() {
    let valid = true;

    // full name required
    const fullname = document.getElementById("fullname").value.trim();
    const fullnameError = document.getElementById("fullnameError");
    if (!fullname) {
        fullnameError.textContent = "Full name is required.";
        valid = false;
    } else {
        fullnameError.textContent = "";
    }

    // email format check
    const resEmail = document.getElementById("res-email").value.trim();
    const resEmailError = document.getElementById("resEmailError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resEmail)) {
        resEmailError.textContent = "Please enter a valid email address.";
        valid = false;
    } else {
        resEmailError.textContent = "";
    }

    // phone - digits only, min 10
    const resPhone = document.getElementById("res-phone").value.trim();
    const resPhoneError = document.getElementById("resPhoneError");
    if (!/^\d{10,}$/.test(resPhone)) {
        resPhoneError.textContent = "Phone number must be digits only and at least 10 digits.";
        valid = false;
    } else {
        resPhoneError.textContent = "";
    }

    // restaurant must be selected
    const restaurant = document.getElementById("restaurant").value;
    const restaurantError = document.getElementById("restaurantError");
    if (!restaurant) {
        restaurantError.textContent = "Please select a restaurant.";
        valid = false;
    } else {
        restaurantError.textContent = "";
    }

    // date must not be in the past
    const resDate = document.getElementById("res-date").value;
    const resDateError = document.getElementById("resDateError");
    if (!resDate) {
        resDateError.textContent = "Please select a date and time.";
        valid = false;
    } else if (new Date(resDate) < new Date()) {
        resDateError.textContent = "Reservation date cannot be in the past.";
        valid = false;
    } else {
        resDateError.textContent = "";
    }

    // number of people must be greater than 0
    const people = parseInt(document.getElementById("people").value);
    const peopleError = document.getElementById("peopleError");
    if (!people || people < 1) {
        peopleError.textContent = "Number of people must be greater than 0.";
        valid = false;
    } else {
        peopleError.textContent = "";
    }

    // payment method must be selected
    const paymentMethod = document.getElementById("paymentMethod").value;
    const paymentMethodError = document.getElementById("paymentMethodError");
    if (!paymentMethod) {
        paymentMethodError.textContent = "Please select a payment method.";
        valid = false;
    } else {
        paymentMethodError.textContent = "";
    }

    // online payment - card type and number required
    if (paymentMethod === "online") {
        const cardType = document.getElementById("cardType").value;
        const cardTypeError = document.getElementById("cardTypeError");
        if (!cardType) {
            cardTypeError.textContent = "Please select a card type.";
            valid = false;
        } else {
            cardTypeError.textContent = "";
        }

        const cardNumber = document.getElementById("cardNumber").value.trim();
        const cardNumberError = document.getElementById("cardNumberError");
        const expectedLength = cardType === "amex" ? 15 : 16;
        if (!/^\d+$/.test(cardNumber) || cardNumber.length !== expectedLength) {
            cardNumberError.textContent = "Card number must be " + expectedLength + " digits.";
            valid = false;
        } else {
            cardNumberError.textContent = "";
        }
    }

    // billing email required
    const billingEmail = document.getElementById("billingEmail").value.trim();
    const billingEmailError = document.getElementById("billingEmailError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingEmail)) {
        billingEmailError.textContent = "Please enter a valid billing email address.";
        valid = false;
    } else {
        billingEmailError.textContent = "";
    }

    return valid;
}

// bill calculator - updates estimate dynamically
function updateBillEstimate() {
    const select = document.getElementById("bill-restaurant");
    const peopleInput = document.getElementById("bill-people");
    const resultDiv = document.getElementById("billResult");

    if (!select || !peopleInput || !resultDiv) return;

    const selected = select.options[select.selectedIndex];
    const minPrice = parseInt(selected.getAttribute("data-min"));
    const maxPrice = parseInt(selected.getAttribute("data-max"));
    const deposit = parseInt(selected.getAttribute("data-deposit"));
    const people = parseInt(peopleInput.value);

    if (!minPrice || !people || people < 1) {
        resultDiv.classList.add("hidden");
        return;
    }

    document.getElementById("billMin").textContent = "Estimated minimum: $" + (minPrice * people);
    document.getElementById("billMax").textContent = "Estimated maximum: $" + (maxPrice * people);
    document.getElementById("billDeposit").textContent = "Deposit required: $" + deposit;

    resultDiv.classList.remove("hidden");
}

// run on page load - prefill restaurant if passed via URL
window.addEventListener("load", function() {
    prefillRestaurant();
});
