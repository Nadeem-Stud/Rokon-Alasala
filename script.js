// =======================================================
// أولاً: تعريف البيانات
// =======================================================

// ** بيانات أسعار الرحلات الثابتة لكل مدينة (طيران + مواصلات + ربح) **
const BASE_PRICES = {
    istanbul: {
        flight: 210,  
        transport: 40, 
        profit: 20,    
        totalBase: 270 
    },
    antalya: {
        flight: 350,  
        transport: 60, 
        profit: 40,    
        totalBase: 450 
    }, 
    cairo: {
        flight: 250,   
        transport: 30, 
        profit: 25,    
        totalBase: 305 
    },
    beirut: {
        flight: 180,   
        transport: 0,  
        profit: 15,    
        totalBase: 195 
    }
};

// ** أسعار الفنادق لكل ليلة ولكل شخص (أو سعر العرض الثابت) **
const hotelPrices = {
    istanbul: [
        { name: "GRAND MILAN - Fatih ", pricePerNight: 12,stars:3 }, 
        { name: "BAYKAL - Fatih", pricePerNight: 14,stars:3 },
        { name: " KAYA MADRID - fatih ", pricePerNight: 14,stars:3 },
        { name: " UNIQUE SUITE - Takism ", pricePerNight: 18,stars:3 },
        { name: " GLORIOUS - fatih ", pricePerNight: 23,stars:4 },
        { name: " NEW EMIN  - fatih ", pricePerNight: 18,stars:4 },
        { name: "VATAN ASUR  - Fatih ", pricePerNight: 20,stars:4 },
        { name: "GRAND GULSOY - Fatih ", pricePerNight: 34,stars:4 },
        { name: "EUROSTARS  OLD CITY - Sirkeci ", pricePerNight: 37,stars:4 },
        { name: "ISTANBUL DORA  - Taksim ", pricePerNight: 18,stars:4 },
        { name: "MINEO PARK  - Taksim  ", pricePerNight: 20,stars:4 },
        { name: "GRAND STAR BOSPHORUS - Taksim ", pricePerNight: 21,stars:4 },
        { name: "THE GREEN PARK - TAKSIM ", pricePerNight: 25,stars:4 },
        { name: "FOUR SIDES LION - TAKSIM   ", pricePerPerNight: 26,stars:4 },
        { name: "SEMINAL OTEL - Taksim ", pricePerNight: 27,stars:4 },
        { name: "TRYP BY WYNDHAM ISTANBUL DOLAPDERE - Taksim ", pricePerNight: 28,stars:4 },
        { name: "METROPOLITAN - TAKSIM ", pricePerNight: 41,stars:4 },
        { name: "ARTS - TAKSIM ", pricePerNight: 33,stars:4 },
        { name: "ELITE WORLD COMFY - TAKSIM ", pricePerNight: 43,stars:4 },
        { name: "TITANIC CITY - TAKSIM ", pricePerNight: 43,stars:4 },
        { name: "RAMADA ENCORE BY WYNDHAM - SISLI ", pricePerNight: 33,stars:4 },
        { name: "OTTOMANS LIFE  DELUXE - Fatih ", pricePerNight: 43,stars:5 },
        { name: "ELITE WORLD ISTANBUL - TAKSIM ", pricePerNight: 48,stars:5 },
        { name: "POINT - TAKSIM ", pricePerNight: 50,stars:5 },
        { name: "MERCURE ISTANBUL BOMONTI - Sisli ", pricePerNight: 33,stars:5 }
    ],
    antalya: [
        { name: " SENSITIVE PREMIUM - BELEK ", pricePerNight: 52 },
        { name: "CLUB HOTEL SERA - LARA ", pricePerNight: 67 },
        { name: "MARVIDA FAMILY ECO - SIDE", pricePerNight: 51 },
        { name: " SEVEN SEAS LIFE - KEMER ", pricePerNight: 62 },
        { name: " XANADU RESORT- BELEK ", pricePerNight: 95 },
        { name: " ORANGE COUNTY - BELEK ", pricePerNight: 44 },
        { name: " KREMLIN PALACE - LARA  ", pricePerNight: 80 },
        { name: " IC GREEN PALACE - LARA ", pricePerNight: 92 },
        { name: " ROYAL SEGINUS- LARA ", pricePerNight: 85 }
    ], 
    cairo: [
        { name: "فندق بيراميدز بارك ريزورت", pricePerNight: 10, stars: 4 },
        { name: "فندق موڤنبيك القاهرة - مدينة الإعلام", pricePerNight: 15, stars: 5 },
        { name: "فندق نايل ريتز كارلتون", pricePerNight: 35, stars: 5 },
        { name: "فندق ومنتجع جي دبليو ماريوت القاهرة", pricePerNight: 40, stars: 5 }
    ],
    beirut: [
        { name: "فندق موفنبيك بيروت", pricePerNight: 20, transportPerDay: 10, totalDailyCost: 30, stars: 5 },
        { name: "كمبينسكي سمرلاند بيروت", pricePerNight: 15, transportPerDay: 8, totalDailyCost: 23, stars: 5 },
        { name: "هوليداي إن فردان", pricePerNight: 12, transportPerDay: 7, totalDailyCost: 19, stars: 4 },
        { name: "رامادا باي ويندام الحمراء", pricePerNight: 10, transportPerDay: 5, totalDailyCost: 15, stars: 4 }
    ],
    batumi: [
        { name: "Caerleon - (بدون فطور)", price: 339, stars: 3 }, 
        { name: "Hotel Genatsvale - (فطور فقط)", price: 379, stars: 3 },
        { name: "Skyline Batumi - (فطور فقط)", price: 429, stars: 4 },
        { name: "Wyn Residences - (فطور فقط)", price: 449, stars: 4 },
        { name: "Aqua Batumi - (فطور فقط)", price: 459, stars: 4 },
        { name: "Steps Batumi - (فطور فقط)", price: 529, stars: 5 },
        { name: "The Grandeur - (فطور فقط)", price: 629, stars: 5 },
        { name: "Alliance Palace Hotel & Otium Casino - (فطور فقط)", price: 649, stars: 5 },
        { name: "Best Western - (فطور فقط)", price: 679, stars: 5 }
    ],
    tbilisi: [
        { name: "AlexsCosy Guesthouse - (بدون فطور)", price: 329, stars: 3 }, 
        { name: "Shine Palace - (فطور فقط)", price: 359, stars: 3 },
        { name: "Green Tower - (فطور فقط)", pricePerNight: 379, stars: 4 },
        { name: "Redline (Marjan city center) - (فطور فقط)", price: 409, stars: 4 },
        { name: "Carousel (Marjan city center) - (فطور فقط)", price: 429, stars: 4 }, 
        { name: "Panorama Lisi - (فطور فقط)", price: 459, stars: 5 },
        { name: "Marjan Plaza - (فطور فقط)", price: 579, stars: 4 } 
    ],
    trabzon: [
        { name: "KURT HOTEL ", price: 435 }, 
        { name: "YILDIZ LİFE SEA VIEW ", price: 450 },
        { name: "MİSAL ROOM ", price: 450 },
        { name: "YOL IS HOLIDAY CİTY CENTER ", price: 510 },
        { name: "YOL IS HOLIDAY CİTY CENTER ", price: 520 },
        { name: "MERCURE SEA VİEW ", price: 520 },
        { name: " RAMADA PLAZA SEA VİEW ", price: 810 }
    ]
};

// =======================================================
// ثانياً: وظائف مساعدة (Includes Date & Stars)
// =======================================================

// الدالة التي تجلب تاريخ اليوم بتنسيق YYYY-MM-DD للتحقق من التاريخ
const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// الدالة تستخدم الرمز النصي للنجمة "★" (يمكن استبدالها بـ Font Awesome)
const generateStars = (count) => "★".repeat(count); 


function showPage(pageId) {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// =======================================================
// ثالثاً: وظائف الحسابات والمنطق
// =======================================================

function calculateTripPrice(city) {
    if (city === 'trabzon' || city === 'batumi' || city === 'tbilisi') return;

    const hotelSelect = document.getElementById(`${city}-hotel`);
    const nightsInput = document.getElementById(`${city}-nights`);
    const outputElement = document.getElementById(`${city}-output-price`);

    const hotelIndex = parseInt(hotelSelect.value);
    const nights = parseInt(nightsInput.value);

    if (hotelIndex === 0 || isNaN(nights) || nights < 1) {
        outputElement.textContent = "الرجاء اختيار فندق وتحديد عدد الليالي.";
        return;
    }

    const selectedHotel = hotelPrices[city][hotelIndex - 1]; 
    const basePrices = BASE_PRICES[city];
    
    let totalCost;

    if (city === 'beirut') {
        const dailyCost = selectedHotel.totalDailyCost || selectedHotel.pricePerNight; 
        const hotelAndTransportCost = dailyCost * nights;
        totalCost = hotelAndTransportCost + basePrices.totalBase;
        
    } else {
        const hotelCost = selectedHotel.pricePerNight * nights;
        totalCost = hotelCost + basePrices.totalBase;
    }

    const formattedPrice = totalCost.toFixed(2);
    outputElement.textContent = `${formattedPrice} دينار أردني`;
    
    checkFormValidity(city); 
}

// =======================================================
// رابعاً: وظائف تحميل البيانات عند بداية التشغيل (Setup)
// =======================================================

// وظيفة تحديد التاريخ الأدنى (تاريخ اليوم) في حقول HTML
function setMinDateForInputs() {
    const minDate = getTodayDateString();

    const cities = ['istanbul', 'antalya', 'cairo', 'beirut', 'trabzon', 'batumi', 'tbilisi'];
    
    cities.forEach(city => {
        const dateInput = document.getElementById(`${city}-date`);
        if (dateInput) {
            dateInput.min = minDate;
        }
    });
}


function populateHotelsDropdowns() {
    const citiesForCalc = ['istanbul', 'antalya', 'cairo', 'beirut']; 
    
    citiesForCalc.forEach(city => {
        const dropdown = document.getElementById(`${city}-hotel`);
        if (!dropdown) return;

        const placeholderText = city === 'antalya' ? 'اختر منتجعاً' : 'اختر فندقاً';
        dropdown.innerHTML = `<option value="0" disabled selected>${placeholderText}</option>`;

        hotelPrices[city].forEach((hotel, index) => {
            const option = document.createElement('option');
            option.value = index + 1; 
            const starRating = generateStars(hotel.stars);
            option.textContent = `${hotel.name} - ${starRating}`;
            dropdown.appendChild(option);
        });
    });
    
    // ملء قوائم طرابزون وباتومي وتبليسي (لنموذج الحجز فقط)
    ['trabzon', 'batumi', 'tbilisi'].forEach(city => {
        const dropdown = document.getElementById(`${city}-hotel`);
        if (!dropdown) return;
        
        dropdown.innerHTML = `<option value="0" disabled selected>اختر فندقاً من الجدول أعلاه</option>`;
        hotelPrices[city].forEach((hotel, index) => {
            const option = document.createElement('option');
            option.value = index + 1; 
            const starRating = hotel.stars ? generateStars(hotel.stars) : '';
            option.textContent = `${hotel.name} ${starRating} (${hotel.price.toFixed(2)} دينار)`;
            dropdown.appendChild(option);
        });
    });
}

function populateBatumiPrices() {
    const batumiTableBody = document.getElementById('batumi-prices');
    if (!batumiTableBody) return;
    
    batumiTableBody.innerHTML = ''; 

    hotelPrices.batumi.forEach(hotel => {
        const row = document.createElement('tr');
        const starRating = hotel.stars ? generateStars(hotel.stars) : '';

        row.innerHTML = `
            <td>${hotel.name} - ${starRating}</td>
            <td>${hotel.price.toFixed(2)}</td>
        `;
        batumiTableBody.appendChild(row);
    });
}

function populateTbilisiPrices() {
    const tbilisiTableBody = document.getElementById('tbilisi-prices');
    if (!tbilisiTableBody) return;
    
    tbilisiTableBody.innerHTML = ''; 

    hotelPrices.tbilisi.forEach(hotel => {
        const row = document.createElement('tr');
        const starRating = hotel.stars ? generateStars(hotel.stars) : '';

        row.innerHTML = `
            <td>${hotel.name} - ${starRating}</td>
            <td>${hotel.price.toFixed(2)}</td>
        `;
        tbilisiTableBody.appendChild(row);
    });
}

function populateTrabzonPrices() {
    const trabzonTableBody = document.getElementById('trabzon-prices');
    if (!trabzonTableBody) return;
    
    trabzonTableBody.innerHTML = ''; 

    hotelPrices.trabzon.forEach(hotel => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${hotel.name}</td>
            <td>${hotel.price.toFixed(2)}</td>
        `;
        trabzonTableBody.appendChild(row);
    });
}

// =======================================================
// خامساً: وظائف التحقق والإرسال (WhatsApp)
// =======================================================

function checkFormValidity(city) {
    const hotelSelect = document.getElementById(`${city}-hotel`);
    const dateInput = document.getElementById(`${city}-date`);
    const phoneInput = document.getElementById(`${city}-phone`);
    const sendButton = document.getElementById(`${city}-send-btn`);
    
    if (sendButton) {
        const isHotelSelected = hotelSelect && hotelSelect.value !== "0";
        const isDateEntered = dateInput && dateInput.value;
        const isPhoneEntered = phoneInput && phoneInput.value && phoneInput.value.length >= 7; 
        
        let isDateValid = true;
        
        // التحقق من التاريخ: إذا كان التاريخ المختار أصغر من تاريخ اليوم، فهو قديم
        if (isDateEntered) {
            const todayString = getTodayDateString(); 
            if (dateInput.value < todayString) { 
                isDateValid = false;
            }
        }
        
        // تفعيل الزر إذا كانت جميع الشروط صحيحة
        if (isHotelSelected && isDateEntered && isPhoneEntered && isDateValid) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    }
}

// ✅ دالة إرسال طلب الحجز عبر الواتساب (WhatsApp)
function sendInquiryEmail(city) {
    // جمع البيانات من النموذج
    const hotel = document.getElementById(`${city}-hotel`).options[document.getElementById(`${city}-hotel`).selectedIndex].text;
    const date = document.getElementById(`${city}-date`).value;
    const people = document.getElementById(`${city}-people-count`).value;
    const phone = document.getElementById(`${city}-phone`).value;
    
    // 🚨 استبدل هذا الرقم برقم هاتفك المخصص لاستقبال الطلبات (مع رمز الدولة وبدون رموز + أو -)
    const phoneNumber = '+962799809646'; 

    // إعداد محتوى الرسالة باللغة العربية
    let messageBody = `*طلب حجز جديد* - رحلة ${city.toUpperCase()}\n\n`;
    messageBody += `--------------------------------------\n`;
    messageBody += `الفندق المختار: ${hotel}\n`;
    messageBody += `تاريخ السفر: ${date}\n`;
    messageBody += `عدد الأشخاص: ${people}\n`;
    messageBody += `رقم هاتف العميل: ${phone}\n`;
    messageBody += `--------------------------------------\n`;
    messageBody += `الرجاء التأكيد وتحديد موعد الاتصال.`;
    
    // ترميز نص الرسالة ليناسب رابط الواتساب
    const encodedMessage = encodeURIComponent(messageBody);

    // بناء رابط الواتساب (Web/Mobile)
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // فتح تطبيق/صفحة الواتساب في نافذة جديدة
    window.open(whatsappLink, '_blank');
}


// =======================================================
// سادساً: التمهيد عند تحميل الصفحة (تفعيل جميع المدن)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    showPage('home-page');

    setMinDateForInputs(); // لضمان عدم اختيار تاريخ قديم

    populateHotelsDropdowns();
    populateTrabzonPrices();
    populateBatumiPrices();
    populateTbilisiPrices();
    
    // تأخير بسيط لضمان تحميل البيانات قبل الحساب والتحقق
    setTimeout(() => {
        calculateTripPrice('istanbul');
        calculateTripPrice('antalya');
        calculateTripPrice('cairo'); 
        calculateTripPrice('beirut'); 
    }, 100); 

    // تطبيق التحقق الأولي لجميع المدن
    checkFormValidity('istanbul'); 
    checkFormValidity('antalya'); 
    checkFormValidity('trabzon');
    checkFormValidity('cairo'); 
    checkFormValidity('beirut');
    checkFormValidity('batumi');
    checkFormValidity('tbilisi');
});