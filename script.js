// =======================================================
// أولاً: تعريف البيانات (للسهولة في التعديل)
// =======================================================

// ** بيانات أسعار الرحلات الثابتة لكل مدينة (يمكنك تعديلها هنا) **
// ملاحظة: هذه الأرقام بالدينار الأردني (JOD)
const BASE_PRICES = {
    // هذه أسعار ثابتة (طيران + مواصلات + ربح) لكل شخص (كمثال)
    istanbul: {
        flight: 210,  // سعر تذكرة الطيران
        transport: 40, // سعر المواصلات
        profit: 20,    // قيمة الربح
        totalBase: 270 // المجموع
    },
    antalya: {
        flight: 350,  // سعر تذكرة الطيران
        transport: 60, // سعر المواصلات
        profit: 40,    // قيمة الربح
        totalBase: 450 // المجموع
    }
};

// ** أسعار الفنادق لـ (اسطنبول وأنطاليا) لكل ليلة ولكل شخص (كمثال) **
const hotelPrices = {
    istanbul: [
        { name: "GRAND MILAN - Fatih ", pricePerNight: 50,stars:3 }, // 50 JOD
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
        { name: "FOUR SIDES LION - TAKSIM   ", pricePerNight: 26,stars:4 },
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
    // ** أسعار فندق طرابزون (لعرض 7 ليالي ثابت) **
    trabzon: [
        { name: "KURT HOTEL ", price: 435 }, // 650 JOD للعرض كاملاً
        { name: "YILDIZ LİFE SEA VIEW ", price: 450 },
        { name: "MİSAL ROOM ", price: 450 },
        { name: "YOL IS HOLIDAY CİTY CENTER ", price: 510 },
        { name: "YOL IS HOLIDAY CİTY CENTER ", price: 520 },
        { name: "MERCURE SEA VİEW ", price: 520 },
        { name: " RAMADA PLAZA SEA VİEW ", price: 810 }
    ]
};

// =======================================================
// ثانياً: وظائف عرض الصفحات
// =======================================================

/**
 * وظيفة لإظهار صفحة معينة وإخفاء جميع الصفحات الأخرى.
 * @param {string} pageId - هوية (ID) الصفحة المراد إظهارها (مثال: 'istanbul-page').
 */
function showPage(pageId) {
    // 1. إخفاء جميع الصفحات
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // 2. إظهار الصفحة المطلوبة
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// =======================================================
// ثالثاً: وظائف الحسابات والمنطق
// =======================================================

/**
 * دالة لحساب السعر الإجمالي لرحلتي اسطنبول وأنطاليا.
 * الحسبة: (سعر الفندق * عدد الليالي) + تذكرة الطيران + المواصلات + الربح
 * @param {string} city - اسم المدينة ('istanbul' أو 'antalya').
 */
function calculateTripPrice(city) {
    // جلب العناصر من الصفحة
    const hotelSelect = document.getElementById(`${city}-hotel`);
    const nightsInput = document.getElementById(`${city}-nights`);
    const outputElement = document.getElementById(`${city}-output-price`);

    // 1. جلب القيم
    const hotelIndex = parseInt(hotelSelect.value);
    const nights = parseInt(nightsInput.value);

    // التحقق من الإدخالات
    if (hotelIndex === 0 || isNaN(nights) || nights < 1) {
        outputElement.textContent = "الرجاء اختيار فندق وتحديد عدد الليالي.";
        return;
    }

    // 2. جلب سعر الفندق من المصفوفة (بالاعتماد على الـ Index)
    const selectedHotel = hotelPrices[city][hotelIndex - 1]; // -1 لأن الـ index يبدأ من 0

    // 3. جلب الأسعار الثابتة (طيران + مواصلات + ربح)
    const basePrices = BASE_PRICES[city];

    // 4. تنفيذ العملية الحسابية
    // (سعر الفندق * عدد الليالي) + (طيران + مواصلات + ربح)
    const hotelCost = selectedHotel.pricePerNight * nights;
    const totalCost = hotelCost + basePrices.totalBase;

    // 5. عرض النتيجة
    // تنسيق الرقم ليكون فيه خانتين عشريتين (0.00)
    const formattedPrice = totalCost.toFixed(2);
    outputElement.textContent = `${formattedPrice} دينار أردني`;
}

// =======================================================
// رابعاً: وظائف تحميل البيانات عند بداية التشغيل (Setup)
// =======================================================

/**
 * وظيفة لملء قوائم الاختيار (Dropdowns) للفنادق.
 */
// في ملف script.js
// في ملف script.js (دالة populateHotelsDropdowns)
function populateHotelsDropdowns() {
    // دالة مساعدة لإنشاء سلسلة من النجوم (مثل: "★★★★")
    const generateStars = (count) => "★".repeat(count);

    // 1. اسطنبول
    const istanbulDropdown = document.getElementById('istanbul-hotel');
    hotelPrices.istanbul.forEach((hotel, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        
        // ***** التعديل هنا: دمج اسم الفندق مع النجوم *****
        const starRating = generateStars(hotel.stars);
        option.textContent = `${hotel.name} - ${starRating}`;
        
        istanbulDropdown.appendChild(option);
    });

    // 2. أنطاليا
    const antalyaDropdown = document.getElementById('antalya-hotel');
    hotelPrices.antalya.forEach((hotel, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        
        // ***** التعديل هنا: دمج اسم الفندق مع النجوم *****
        const starRating = generateStars(hotel.stars);
        option.textContent = `${hotel.name} - ${starRating}`;
        
        antalyaDropdown.appendChild(option);
    });
}

/**
 * وظيفة لملء جدول أسعار طرابزون الثابت.
 */
function populateTrabzonPrices() {
    const trabzonTableBody = document.getElementById('trabzon-prices');
    trabzonTableBody.innerHTML = ''; // تفريغ الجدول أولاً

    hotelPrices.trabzon.forEach(hotel => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${hotel.name}</td>
            <td>${hotel.price.toFixed(2)}</td>
        `;
        trabzonTableBody.appendChild(row);
    });
}


// في ملف script.js (في آخر الدالة)
document.addEventListener('DOMContentLoaded', () => {
    // إظهار الصفحة الرئيسية أولاً
    showPage('home-page');

    // ملء قوائم الفنادق وجدول طرابزون
    populateHotelsDropdowns();
    populateTrabzonPrices();
    
    // ** إضافة هذه الأسطر لتفعيل الحساب التلقائي عند التحميل **
    // (حتى إذا كان الفندق الأول هو المختار وعدد الليالي هو 7)
    // هذا يضمن أن يتم عرض السعر إذا كانت القيم الافتراضية مختارة
    setTimeout(() => {
        calculateTripPrice('istanbul');
        calculateTripPrice('antalya');
    }, 100); // تأخير بسيط لضمان تحميل القوائم أولاً
});