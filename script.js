// =======================================================
// أولاً: تعريف البيانات
// =======================================================

// ** بيانات أسعار الرحلات الثابتة لكل مدينة (طيران + مواصلات + ربح) **
const BASE_PRICES = {
    istanbul: { flight: 210, transport: 40, profit: 20, totalBase: 270 },
    antalya: { flight: 350, transport: 60, profit: 40, totalBase: 450 },
    // بيانات طرابزون الأساسية
    trabzon: { flight: 220, transport: 50, profit: 30, totalBase: 300 }, 
    cairo: { flight: 250, transport: 30, profit: 25, totalBase: 305 },
    beirut: { flight: 180, transport: 0, profit: 15, totalBase: 195 }
};

// ** أسعار الفنادق لكل ليلة ولكل شخص (أو سعر العرض الثابت) **
const hotelPrices = {
    istanbul: [
        { name: "GRAND MILAN - Fatih ", pricePerNight: 12,stars:3 }, 
        { name: "BAYKAL - Fatih", pricePerNight: 14,stars:3 },
        { name: " KAYA MADRID - fatih ", pricePerNight: 17,stars:4 }, 
        { name: "GRAND OSMAN - Fatih", pricePerNight: 20,stars:4 },
        { name: "RADISSON BLU BOSPHORUS - ORTAKÖY", pricePerNight: 35,stars:5 }, 
        { name: "AJWA SULTANAHMET - SULTANAHMET", pricePerNight: 60,stars:5 },
    ],
    antalya: [
        { name: "HOTEL SU & AQUALAND - Konyaalti", pricePerNight: 30,stars:5 }, 
        { name: "PORTO BELLO HOTEL RESORT & SPA - Konyaalti", pricePerNight: 45,stars:5 },
        { name: "AKRA KEMER - Kemer", pricePerNight: 60,stars:5, allInclusive: true }, 
        { name: "IC HOTELS AIRPORT - Airport Zone", pricePerNight: 25,stars:4 },
    ], 
    cairo: [
        { name: "Steigenberger Pyramids Cairo - 5 Star", pricePerNight: 25,stars:5 }, 
        { name: "The Nile Ritz-Carlton - 5 Star", pricePerNight: 45,stars:5 },
        { name: "TOLIP Gardens Hotel - 4 Star", pricePerNight: 18,stars:4 }, 
    ],
    beirut: [
        { name: "Cilicia Hotel - 4 Star", totalDailyCost: 25, stars: 4 }, 
        { name: "Crowne Plaza Hamra - 5 Star", totalDailyCost: 40, stars: 5 },
    ],
    // بيانات طرابزون (السعر ثابت للإقامة حسب الليالي)
    trabzon: [
        { 
            name: "RAMADA PLAZA TRABZON", 
            stars: 5, 
            pricesByNights: { 4: 200, 5: 240, 7: 320 } 
        },
        { 
            name: "NOVOTEL TRABZON", 
            stars: 4, 
            pricesByNights: { 4: 150, 5: 180, 7: 250 } 
        },
        { 
            name: "شقق فندقية راقية", 
            stars: 0, 
            pricesByNights: { 4: 180, 5: 220, 7: 300 } 
        },
    ],
    // المدن ذات الأسعار الثابتة الكاملة (للتخطيط القديم)
    batumi: [
        { name: "Sheraton Batumi - 5 Star", price: 380, nights: 8, stars: 5 },
        { name: "Le Meridien Batumi - 5 Star", price: 420, nights: 8, stars: 5 },
        { name: "Sky Inn Batumi - 4 Star", price: 290, nights: 8, stars: 4 },
    ],
    tbilisi: [
        { name: "Shine Palace", price: 379, singlePrice: 479, nights: 7, stars: 3, meals: "بدون فطور" },
        { name: "Shine Palace", price: 399, singlePrice: 499, nights: 7, stars: 3, meals: "فطور فقط" },
        { name: "Green Tower", price: 429, singlePrice: 529, nights: 7, stars: 4, meals: "فطور فقط" },
        { name: "Redline (Marjan city center)", price: 449, singlePrice: 599, nights: 7, stars: 4, meals: "فطور فقط" },
        { name: "Carousel (Marjan city center)", price: 479, singlePrice: 629, nights: 7, stars: 5, meals: "فطور فقط" },
        { name: "Panorama Lisi", price: 499, singlePrice: 699, nights: 7, stars: 5, meals: "فطور فقط" },
        { name: "Marjan Plaza", price: 579, singlePrice: 779, nights: 7, stars: 5, meals: "فطور فقط" },
        { name: "Ramada By Wyndham", price: 599, singlePrice: 799, nights: 7, stars: 5, meals: "فطور فقط" },
        { name: "Preference Hualing", price: 599, singlePrice: 799, nights: 7, stars: 5, meals: "فطور فقط" },
        { name: "Royal Tulip with Casino", price: 629, singlePrice: 829, nights: 7, stars: 5, meals: "فطور فقط" },
        { name: "Pullman Tbilisi", price: 749, singlePrice: 949, nights: 7, stars: 5, meals: "فطور فقط" },
    ],
    // ⭐️⭐️ البيانات الجديدة لـ "باتومي وتبليسي" (8 ليالي) ⭐️⭐️
    batumiTbilisi: [
        { nameTbilisi: "Shine Palace", nameBatumi: "Skyline", price: 399, meals: "بدون فطور", roomType: "ستاندرد", stars: 3, singlePrice: 479, nights: 8 },
        { nameTbilisi: "Shine Palace", nameBatumi: "Skyline", price: 449, meals: "فطور فقط", roomType: "ستاندرد", stars: 3, singlePrice: 499, nights: 8 },
        { nameTbilisi: "Redline (Marjan city center)", nameBatumi: "Legacy", price: 469, meals: "فطور فقط", roomType: "ستاندرد", stars: 4, singlePrice: 529, nights: 8 },
        { nameTbilisi: "Redline (Marjan city center)", nameBatumi: "Wyn Residences", price: 479, meals: "فطور فقط", roomType: "ستاندرد", stars: 4, singlePrice: 599, nights: 8 },
        { nameTbilisi: "Carousel (Marjan city center)", nameBatumi: "Legacy", price: 489, meals: "فطور فقط", roomType: "ستاندرد", stars: 4, singlePrice: 629, nights: 8 },
        { nameTbilisi: "Carousel (Marjan city center)", nameBatumi: "Wyn Residences", price: 499, meals: "فطور فقط", roomType: "ستاندرد", stars: 4, singlePrice: 699, nights: 8 },
        { nameTbilisi: "Redline (Marjan city center)", nameBatumi: "Steps Batumi", price: 519, meals: "فطور فقط", roomType: "ستاندرد", stars: 4, singlePrice: 599, nights: 8 },
        { nameTbilisi: "Carousel (Marjan city center)", nameBatumi: "Steps Batumi", price: 529, meals: "فطور فقط", roomType: "ستاندرد", stars: 4, singlePrice: 629, nights: 8 },
        { nameTbilisi: "Ramada By Wyndham", nameBatumi: "Steps Batumi", price: 549, meals: "فطور فقط", roomType: "ستاندرد", stars: 5, singlePrice: 779, nights: 8 },
        { nameTbilisi: "Royal Tulip Hotel & Casino", nameBatumi: "Steps Batumi", price: 579, meals: "فطور فقط", roomType: "ستاندرد", stars: 5, singlePrice: 799, nights: 8 },
        { nameTbilisi: "Royal Tulip Hotel & Casino", nameBatumi: "The Grandeur", price: 629, meals: "فطور فقط", roomType: "ستاندرد", stars: 5, singlePrice: 829, nights: 8 },
        { nameTbilisi: "Royal Tulip Hotel & Casino", nameBatumi: "JRW Welmond", price: 679, meals: "فطور فقط", roomType: "ستاندرد", stars: 5, singlePrice: 829, nights: 8 }
    ]
};

// =======================================================
// ثانياً: وظائف التنقل
// =======================================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// =======================================================
// ثالثاً: وظائف الحساب
// =======================================================

/**
 * دالة حساب السعر للمدن ذات التسعير المتحرك (اسطنبول، أنطاليا، القاهرة، بيروت، طرابزون)
 */
function calculateTripPrice(city) {
    if (city === 'batumi' || city === 'tbilisi' || city === 'batumiTbilisi') return;

    const hotelSelect = document.getElementById(`${city}-hotel`);
    const nightsElement = document.getElementById(`${city}-nights`); 
    const peopleCountInput = document.getElementById(`${city}-people-count`);
    const resultBox = document.getElementById(`${city}-result`);

    const hotelIndex = parseInt(hotelSelect.value);
    const peopleCount = parseInt(peopleCountInput.value) || 0;
    
    let nights;
    let nightsValid;
    
    if (city === 'trabzon') {
        nights = parseInt(nightsElement.value);
        nightsValid = nightsElement.value !== '0' && !isNaN(nights);
    } else {
        nights = parseInt(nightsElement.value);
        nightsValid = !isNaN(nights) && nights >= 1;
    }

    if (hotelIndex === 0 || !nightsValid || peopleCount < 1) {
        resultBox.style.display = 'none';
        checkFormValidity(city);
        return;
    }
    
    resultBox.style.display = 'block';

    const selectedHotel = hotelPrices[city][hotelIndex - 1]; 
    const basePrices = BASE_PRICES[city];
    
    let totalCostPerPerson;
    let hotelCost;

    if (city === 'beirut') {
        const dailyCost = selectedHotel.totalDailyCost; 
        hotelCost = dailyCost * nights;
        totalCostPerPerson = hotelCost + basePrices.totalBase;
        
    } else if (city === 'trabzon') {
        const nightsKey = nights.toString();
        hotelCost = selectedHotel.pricesByNights[nightsKey]; 
        
        if (typeof hotelCost === 'undefined') {
             resultBox.innerHTML = `<p>خطأ: سعر الإقامة غير محدد لـ ${nights} ليالٍ في هذا الفندق.</p>`;
             resultBox.style.display = 'block';
             return;
        }
        
        totalCostPerPerson = hotelCost + basePrices.totalBase;

    } else {
        hotelCost = selectedHotel.pricePerNight * nights;
        totalCostPerPerson = hotelCost + basePrices.totalBase;
    }
    
    resultBox.innerHTML = `
        <h3>السعر المحتسب (لشخص واحد):</h3>
        <div class="result-row">
            <span>السعر الإجمالي للشخص الواحد:</span>
            <strong>${totalCostPerPerson.toFixed(2)} دينار</strong>
        </div>
        <div class="result-row result-note">
            <small>*يشمل السعر الإجمالي تكلفة الرحلة الأساسية (طيران ومواصلات) والإقامة (${nights} ليالي).</small>
        </div>
    `;
    
    checkFormValidity(city); 
}

/**
 * دالة حساب السعر للمدن ذات التسعير الثابت (باتومي، تبليسي، باتومي وتبليسي المدمجة)
 */
function calculateFixedTripPrice(city) {
    if (city === 'trabzon') return; 

    // ⭐️ تحديد الـ ID الصحيح (باتومي تستخدم hotel، والباقي option) ⭐️
    let hotelSelectId = `${city}-hotel`;
    if (city === 'tbilisi' || city === 'batumiTbilisi') {
         hotelSelectId = `${city}-option`;
    }
    const hotelSelect = document.getElementById(hotelSelectId);
    
    const peopleCountInput = document.getElementById(`${city}-people-count`);
    const resultBox = document.getElementById(`${city}-result`);

    const hotelIndex = parseInt(hotelSelect.value);
    const peopleCount = parseInt(peopleCountInput.value) || 0;

    if (hotelIndex === 0 || peopleCount < 1) {
        resultBox.style.display = 'none';
        checkFormValidity(city);
        return;
    }

    resultBox.style.display = 'block';

    const selectedOption = hotelPrices[city][hotelIndex - 1]; 
    const nightsText = selectedOption.nights;
    const totalCostPerPerson = selectedOption.price;

    resultBox.innerHTML = `
        <h3>السعر المحتسب (لشخص واحد):</h3>
        <div class="result-row">
            <span>السعر الإجمالي للشخص الواحد:</span>
            <strong>${totalCostPerPerson.toFixed(2)} دينار</strong>
        </div>
       
        <div class="result-row result-note">
            <small>*يشمل السعر الإجمالي العرض الثابت لمدة ${nightsText + 1} أيام / ${nightsText} ليالي.</small>
        </div>
    `;

    checkFormValidity(city);
}

// =======================================================
// رابعاً: وظائف التحقق والتفعيل
// =======================================================

/**
 * دالة التحقق من صحة الحقول وتفعيل زر الإرسال
 */
function checkFormValidity(city) {
    // تحديد المدن ذات السعر الثابت
    const isFixedPrice = (city === 'batumi' || city === 'tbilisi' || city === 'batumiTbilisi'); 
    const isRestrictedNights = (city === 'trabzon');
    
    // تحديد حقل الفندق الصحيح
    let hotelSelectId = `${city}-hotel`;
    if (city === 'tbilisi' || city === 'batumiTbilisi') {
        hotelSelectId = `${city}-option`;
    }
    const hotelSelect = document.getElementById(hotelSelectId);

    const dateInput = document.getElementById(`${city}-date`);
    const peopleCountInput = document.getElementById(`${city}-people-count`);
    const phoneInput = document.getElementById(`${city}-phone`);
    const sendButton = document.getElementById(`${city}-send-btn`);
    const nightsInput = document.getElementById(`${city}-nights`); 
    
    const isValidShared = hotelSelect && hotelSelect.value !== '0' && 
                          dateInput && dateInput.value !== '' && 
                          peopleCountInput && parseInt(peopleCountInput.value) >= 1 &&
                          phoneInput && phoneInput.value.length > 5;

    let isNightsValid = true; 
    
    if (!isFixedPrice) {
        if (isRestrictedNights) {
            isNightsValid = nightsInput && nightsInput.value !== '0';
        } else {
            isNightsValid = nightsInput && parseInt(nightsInput.value) >= 1;
        }
    }
    
    let isValidForm;

    if (isFixedPrice) {
        isValidForm = isValidShared;
    } else {
        isValidForm = isValidShared && isNightsValid;
    }

    if (sendButton) {
        sendButton.disabled = !isValidForm;
    }
}


// =======================================================
// خامساً: وظائف تعبئة البيانات
// =======================================================

const generateStars = (count) => "⭐".repeat(count); 

/**
 * تعبئة القوائم المنسدلة للفنادق (للمدن المتحركة)
 */
function populateHotelsDropdowns() {
    const citiesForCalc = ['istanbul', 'antalya', 'cairo', 'beirut', 'trabzon']; 
    
    citiesForCalc.forEach(city => {
        const dropdown = document.getElementById(`${city}-hotel`);
        if (!dropdown) return;

        const placeholderText = city === 'antalya' ? 'اختر منتجعاً' : 'اختر فندقاً';
        dropdown.innerHTML = `<option value="0" disabled selected>${placeholderText}</option>`;

        hotelPrices[city].forEach((hotel, index) => {
            const option = document.createElement('option');
            option.value = index + 1; 
            const hotelName = hotel.name.trim(); 
            const starRating = generateStars(hotel.stars || 0);
            option.textContent = `${hotelName} ${starRating}`;
            dropdown.appendChild(option);
        });
        
        dropdown.addEventListener('change', () => calculateTripPrice(city));
        
        if (city === 'trabzon') {
            document.getElementById('trabzon-nights').addEventListener('change', () => calculateTripPrice('trabzon'));
        }
    });
}

/**
 * تعبئة أسعار باتومي (للمدن الثابتة)
 */
function populateBatumiPrices() {
    const container = document.getElementById('batumi-prices-table-container');
    const dropdown = document.getElementById('batumi-hotel');
    if (!container || !dropdown) return;
    
    let tableHTML = `
        <div class="trip-details-box">
            <h4>تفاصيل الباقات الثابتة (9 أيام / 8 ليالي)</h4>
            <p>تشمل جميع الباقات: طيران دولي، إقامة، إفطار، مواصلات داخلية وجولات سياحية.</p>
        </div>
        <table class="prices-table">
            <thead>
                <tr>
                    <th>الفندق</th>
                    <th>النجوم</th>
                    <th>السعر للشخص الواحد (دينار)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    dropdown.innerHTML = `<option value="0" disabled selected>اختر فندقاً من الجدول أعلاه</option>`;

    hotelPrices.batumi.forEach((option, index) => {
        const optionValue = index + 1;
        const starDisplay = `<span class="star-rating">${generateStars(option.stars)}</span>`;
        
        tableHTML += `
            <tr>
                <td>${option.name}</td>
                <td>${starDisplay}</td>
                <td><strong>${option.price.toFixed(2)}</strong></td>
            </tr>
        `;

        const optionElement = document.createElement('option');
        optionElement.value = optionValue;
        optionElement.textContent = `${option.name} (${option.price} دينار)`;
        dropdown.appendChild(optionElement);
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

/**
 * تعبئة أسعار تبليسي (للمدن الثابتة)
 */
function populateTbilisiPrices() {
    const container = document.getElementById('tbilisi-prices-table-container');
    const dropdown = document.getElementById('tbilisi-option');
    if (!container || !dropdown) return;
    
    let tableHTML = `
        <div class="trip-details-box">
            <h4>تفاصيل باقات تبليسي (8 أيام / 7 ليالي) - الرحيل كل جمعة 📅</h4>
            <p>يشمل السعر (للفرد في الغرفة المزدوجة/الثلاثية): طيران دولي، إقامة، وجبات محددة، مواصلات داخلية وجولات سياحية.</p>
        </div>
        <table class="prices-table">
            <thead>
                <tr>
                    <th>الفندق</th>
                    <th>النجوم</th>
                    <th>وجبات الطعام</th>
                    <th>السعر الأساسي (دينار)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    dropdown.innerHTML = `<option value="0" disabled selected>اختر فندقاً من الجدول أعلاه</option>`;

    hotelPrices.tbilisi.forEach((option, index) => {
        const optionValue = index + 1;
        const starDisplay = `<span class="star-rating">${generateStars(option.stars)}</span>`;
        
        tableHTML += `
            <tr>
                <td>${option.name}</td>
                <td>${starDisplay}</td>
                <td>${option.meals}</td>
                <td><strong>${option.price.toFixed(2)}</strong></td>
            </tr>
        `;

        const optionElement = document.createElement('option');
        optionElement.value = optionValue;
        optionElement.textContent = `${option.name} - ${option.meals} (السعر: ${option.price} دينار)`;
        dropdown.appendChild(optionElement);
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

/**
 * ⭐️⭐️ تعبئة أسعار الباقة المدمجة (باتومي وتبليسي) ⭐️⭐️
 */
function populateBatumiTbilisiPrices() {
    const city = 'batumiTbilisi';
    const container = document.getElementById(`${city}-prices-table-container`);
    const dropdown = document.getElementById(`${city}-option`);
    if (!container || !dropdown) return;
    
    let tableHTML = `
        <div class="trip-details-box">
            <h4>تفاصيل باقة باتومي وتبليسي المدمجة (9 أيام / 8 ليالي)</h4>
            <p>يشمل السعر (للفرد في الغرفة المزدوجة/الثلاثية): طيران دولي، 4 ليالي باتومي و 4 ليالي تبليسي، تنقلات و جولات سياحية.</p>
        </div>
        <table class="prices-table">
            <thead>
                <tr>
                    <th>فندق باتومي</th>
                    <th>فندق تبليسي</th>
                    <th>وجبات الطعام</th>
                    <th>السعر للشخص (دينار)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    dropdown.innerHTML = `<option value="0" disabled selected>اختر باقة من الجدول أعلاه</option>`;

    hotelPrices[city].forEach((option, index) => {
        const optionValue = index + 1;
        
        tableHTML += `
            <tr>
                <td>${option.nameBatumi}</td>
                <td>${option.nameTbilisi}</td>
                <td>${option.meals}</td>
                <td><strong>${option.price.toFixed(2)}</strong></td>
            </tr>
        `;

        const optionElement = document.createElement('option');
        optionElement.value = optionValue;
        optionElement.textContent = `${option.nameBatumi} + ${option.nameTbilisi} (${option.meals} - السعر: ${option.price} دينار)`;
        dropdown.appendChild(optionElement);
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}


/**
 * تعبئة صندوق تفاصيل الرحلة لكل مدينة
 */
function populateTripDetails(city) {
    const detailsBox = document.getElementById(`${city}-details-box`);
    if (!detailsBox) return;

    let title;
    let details;
    const commonItems = [
        "تذاكر الطيران الدولية (ذهاب وإياب)",
        "الاستقبال والتوديع في المطار",
        "جولات سياحية يومية مع مرشد خاص",
        "تأمين صحي للسفر (لبعض الوجهات)",
        "جميع الضرائب والرسوم"
    ];

    switch(city) {
        case 'istanbul':
        case 'antalya':
        case 'trabzon':
        case 'cairo':
        case 'beirut':
        case 'batumi':
            // Logic for existing cities
            title = "ماذا يشمل عرض " + city.charAt(0).toUpperCase() + city.slice(1) + "؟";
            details = commonItems; 
            break;
        case 'tbilisi':
            title = "عرض تبليسي (8 أيام / 7 ليالي) - الرحيل كل جمعة";
            details = [...commonItems, "إقامة في الفندق المختار", "وجبات الطعام حسب الباقة المختارة"];
            break;
        case 'batumiTbilisi':
            // ⭐️ تفاصيل الباقة المدمجة ⭐️
            title = "عرض باتومي وتبليسي المدمج (9 أيام / 8 ليالي)";
            details = [
                ...commonItems, 
                "إقامة 4 ليالي في فندق باتومي و 4 ليالي في فندق تبليسي",
                "وجبات الطعام حسب الباقة المختارة",
                "جميع التنقلات بين المدن وجولات سياحية"
            ];
            break;
        default:
            return;
    }

    let listHTML = details.map(item => `<li>${item}</li>`).join('');

    detailsBox.innerHTML = `
        <h4>${title}</h4>
        <ul>
            ${listHTML}
        </ul>
    `;
}

// =======================================================
// سادساً: وظيفة إرسال الطلب عبر واتساب
// =======================================================

function sendInquiryEmail(city) {
    const isFixedPrice = (city === 'batumi' || city === 'tbilisi' || city === 'batumiTbilisi');
    
    // تحديد حقل الفندق الصحيح
    let hotelSelectId = `${city}-hotel`;
    if (city === 'tbilisi' || city === 'batumiTbilisi') {
        hotelSelectId = `${city}-option`;
    }
    const hotelSelect = document.getElementById(hotelSelectId);

    const nightsInput = document.getElementById(`${city}-nights`);
    const dateInput = document.getElementById(`${city}-date`);
    const peopleCountInput = document.getElementById(`${city}-people-count`);
    const phoneInput = document.getElementById(`${city}-phone`);
    const resultBox = document.getElementById(`${city}-result`);

    const hotelName = hotelSelect ? hotelSelect.options[hotelSelect.selectedIndex].text : 'غير محدد';
    let nights;
    
    if (city === 'tbilisi') {
        nights = '7 ليالي';
    } else if (city === 'batumiTbilisi') {
        nights = '8 ليالي';
    } else if (nightsInput) {
        nights = nightsInput.value;
    } else {
        nights = 'غير محدد (عرض ثابت)';
    }

    const date = dateInput ? dateInput.value : 'غير محدد';
    const peopleCount = peopleCountInput ? peopleCountInput.value : 'غير محدد';
    const phoneNumber = phoneInput ? phoneInput.value : 'غير محدد';
    
    let finalPrice = 'غير محدد';
    const priceElement = resultBox.querySelector('.result-row strong');
    if (priceElement) {
        finalPrice = priceElement.textContent.trim();
    }
    
    const whatsappNumber = "962770000000"; 

    const message = `
*طلب حجز رحلة سياحية*

*المدينة:* ${city.toUpperCase()}
*الفندق/الباقة:* ${hotelName}
*عدد الأشخاص:* ${peopleCount}
*عدد الليالي:* ${nights}
*تاريخ السفر المطلوب:* ${date}

*السعر المحتسب للشخص:* ${finalPrice}

*رقم هاتف العميل:* ${phoneNumber}

الرجاء التواصل معي لتأكيد الحجز. شكراً.
    `;

    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
}

// =======================================================
// سابعاً: وظائف مساعدة للتاريخ والتهيئة
// =======================================================

function isFriday(dateString) {
    const date = new Date(dateString);
    return date.getDay() === 5; 
}

function getNextFriday(minDays = 2) {
    const today = new Date();
    today.setDate(today.getDate() + minDays); 
    
    let date = today;
    while (date.getDay() !== 5) { 
        date.setDate(date.getDate() + 1);
    }
    return date.toISOString().split('T')[0];
}


function setMinDateForInputs() {
    const today = new Date();
    today.setDate(today.getDate() + 2); 
    const minDate = today.toISOString().split('T')[0];
    
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('min', minDate);
        
        // تطبيق قيد الجمعة على تبليسي فقط
        if (input.id === 'tbilisi-date') {
            input.addEventListener('change', (event) => {
                const selectedDate = event.target.value;
                if (selectedDate && !isFriday(selectedDate)) {
                    alert('لرحلات تبليسي، يجب اختيار يوم الجمعة فقط.');
                    event.target.value = getNextFriday(); 
                    checkFormValidity('tbilisi');
                }
            });
            const nextFriday = getNextFriday(2);
            input.setAttribute('min', nextFriday);
            input.value = nextFriday; 
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    showPage('home-page');

    setMinDateForInputs(); 

    // تعبئة القوائم والجداول
    populateHotelsDropdowns();
    populateBatumiPrices();
    populateTbilisiPrices();
    // ⭐️ تعبئة الجدول الجديد ⭐️
    populateBatumiTbilisiPrices();
    
    // تعبئة صناديق تفاصيل الرحلة لجميع المدن
    populateTripDetails('istanbul');
    populateTripDetails('antalya');
    populateTripDetails('trabzon');
    populateTripDetails('cairo');
    populateTripDetails('beirut');
    populateTripDetails('batumi');
    populateTripDetails('tbilisi');
    // ⭐️ تعبئة التفاصيل الجديدة ⭐️
    populateTripDetails('batumiTbilisi');
    
    // تحديث النتائج الأولية
    setTimeout(() => {
        calculateTripPrice('istanbul');
        calculateTripPrice('antalya');
        calculateTripPrice('trabzon');
        calculateTripPrice('cairo'); 
        calculateTripPrice('beirut'); 
        
        calculateFixedTripPrice('batumi');
        calculateFixedTripPrice('tbilisi');
        // ⭐️ حساب السعر الجديد ⭐️
        calculateFixedTripPrice('batumiTbilisi');
    }, 100); 

    // تطبيق التحقق الأولي لجميع المدن
    checkFormValidity('istanbul'); 
    checkFormValidity('antalya'); 
    checkFormValidity('cairo'); 
    checkFormValidity('beirut'); 
    checkFormValidity('trabzon');
    checkFormValidity('batumi');
    checkFormValidity('tbilisi');
    // ⭐️ التحقق من النموذج الجديد ⭐️
    checkFormValidity('batumiTbilisi');

});