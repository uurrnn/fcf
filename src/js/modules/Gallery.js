import * as basicLightbox from 'basiclightbox'
import lozad from 'lozad';

const observer = lozad();
const gallery = document.querySelector("#gallery");
const galleryDir = '/images/gallery/';

// move to onbuild based on images/gallery folders, but not the home folder
const galleryItems = [
    {
        type: 'event',
        name: '50s-luncheon-2015',
        year: '2015',
        images: [
            '10258503_10205632840758568_3248484636796540894_o-150x150.jpeg',
            '10465535_10205632841318582_9027455795363752316_o-150x150.jpeg',
            '11111123_10205632842438610_5798283119889066025_o-150x150.jpeg',
            '11165104_10205632836078451_1496838251183904875_o-150x150.jpeg',
            '11270306_10205632839438535_5071932371497316516_o-150x150.jpeg',
            '11270427_10205632835558438_5045221243466010985_o-300x200.jpeg',
            '11270517_10205632836478461_3759680978800474578_o-150x150.jpeg',
            '11312709_10205632840318557_1852316841385559840_o-150x150.jpeg',
            '11312850_10205632841638590_8277329355262318212_o-150x150.jpeg',
            '11313052_10205632838358508_2226882719799589527_o-150x150.jpeg',
            '11393228_10205632837478486_5049981036918190724_o-150x150.jpeg',
        ]
    },
    {
        type: 'event',
        name: '50s-luncheon-2018',
        year: '2018',
        thumbs: true,
        images: [
            "DSC_1884.jpg",
            "DSC_1885.jpg",
            "DSC_1886.jpg",
            "DSC_1887.jpg",
            "DSC_1888.jpg",
            "DSC_1889.jpg",
            "DSC_1890.jpg",
            "DSC_1892.jpg",
            "DSC_1893.jpg",
            "DSC_1894.jpg",
            "DSC_1896.jpg",
            "DSC_1897.jpg",
            "DSC_1898.jpg",
            "DSC_1902.jpg",
            "DSC_1903.jpg",
            "DSC_1904.jpg",
            "DSC_1906.jpg",
            "DSC_1908.jpg",
            "DSC_1909.jpg",
            "DSC_1910.jpg",
            "DSC_1912.jpg",
            "DSC_1914.jpg",
            "DSC_1915.jpg",
            "DSC_1916.jpg",
            "DSC_1918.jpg",
            "DSC_1919.jpg",
            "DSC_1920.jpg",
            "DSC_1923best.jpg",
            "DSC_1927.jpg",
            "DSC_1933.jpg",
            "DSC_1935.jpg",
            "DSC_1936.jpg",
            "DSC_1938.jpg",
            "DSC_1939.jpg",
            "DSC_1940.jpg",
            "DSC_1947.jpg",
            "DSC_1948.jpg",
            "IMG_0904-1.jpg",
            "IMG_0909-1.jpg"
        ]
    },
    {
        type: 'event', name: 'homecoming-breakfast-2019', year: '2019', thumbs: true,
        images: [
            "Doug-Schneider-class-of-96-1024x683.jpg",
            "Dr.-Rebecca-Nicolas-FCHS-principal-1024x683.jpg",
            "FCHS-band-playing-1024x683.jpg",
            "FCHS-students-serving-drinks-1024x683.jpg",
            "Group-shot-of-students-who-prepared-breakfast-1024x683.jpg",
            "IMG_7050-1024x683.jpg",
            "IMG_7085-1024x683.jpg",
            "Janet-Lowmam-Priscilla-Maddix-1024x683.jpg",
            "Josh-Warren-directing-the-band-1024x683.jpg",
            "Ken-Debbie-Leffew-1024x683.jpg",
            "Marita-Witten-in-Creek-store.-1024x683.jpg",
            "Mark-Lewis-with-FCHS-students-1024x683.jpg",
            "Mike-Gatton.jpg",
            "Mike-Gatton-Doug-Schneider-Dotty-Byers-1024x683.jpg",
            "Mr.-Hawkins-graduated-FCHS-70-years-ago-1024x683.jpg",
            "Mr.-Mrs-Woodworth-showing-off-their-new-spirit-wear-1024x683.jpg",
            "Mr.-Peters-Book-1024x683.jpg",
            "Mr.-Peters-family-1024x683.jpg",
            "Mr.-Peters-giving-instructions-to-students-1024x683.jpg",
            "Mr.-Peters-student-cooks-1024x683.jpg",
            "Rhonda-Jacobs-Class-of-92-1024x683.jpg",
            "Rhonda-Jacobs-showing-off-the-flags-bought-with-Alumni-funding.-1024x683.jpg",
            "Rob-Lisa-Robinson-1024x683.jpg",
            "Welcome-banner-for-breakfast-1024x683.jpg"
        ]
    },
    {
        type: 'event', name: 'homecoming-tailgate-2019', year: '2019', thumbs: true,
        images: [
            "Alumni-cheering-with-the-band-1024x683.jpg",
            "Alumni-enjoying-breakfast-1024x683.jpg",
            "Alumni-signing-in-for-breakfast-1024x683.jpg",
            "Alumni-watching-the-band-perform-1024x683.jpg",
            "Anderson-Family-1024x683.jpg",
            "Band-Recogniton-for-Alumni-1024x683.jpg",
            "Checking-out-the-Hall-of-Fame-Wall-1024x683.jpg",
            "Chris-Brady-Skipper-Martin-1024x683.jpg",
            "Class-of-04-Emily-Holloway-Johnson-Jeremy-Johnson-1024x683.jpg",
            "Class-of-92-Melissa-Roberts-Tabor-Class-of-2020-Judson-Tabor-Scott-Tabor-1024x683.jpg",
            "Class-of-95-Brrke-Taylor-Larosa-family-1024x683.jpg",
            "Class-of-2008-Jenny-Hibbs-friends-1024x683.jpg",
            "Class-of-2020-President-Krissy-Taylor-1024x683.jpg",
            "David-Pam-Stout-1024x683.jpg",
            "Dotty-Austin-Byers-1024x683.jpg",
            "Doug-Paula-Schneider-check-out-her-plaque-in-the-Hall-of-Fame-1024x683.jpg",
            "FC-band-playing-1024x683.jpg",
            "FCHS-Band-1024x683.jpg",
            "FCHS-band-preparing-to-march-to-game-1024x683.jpg",
            "James-Betty-Ward-1024x683.jpg",
            "Jeanne-Newman-Matt-Joan-Howard-1024x683.jpg",
            "Joey-Bailey-Mike-Gatton-1024x683.jpg",
            "Josh-Warren-Band-1024x683.jpg",
            "MCJROTC-Cadets-1024x683.jpg",
            "MCJROTC-Cadets-serve-food-1024x683.jpg",
            "Morgan-McGarvey-1024x683.jpg",
            "Mr.-Mrs.-Schwartz-1024x683.jpg",
            "Mrs.-Bailey-Mrs.-Newman-1024x683.jpg",
            "Room-Setup-Don-Pierce-1024x683.jpg",
            "School-board-Member-Chris-Brady-Dr.-Rebecca-Nicolasprincipal-FCHS-1024x683.jpg",
            "Sen.-Morgan-McGarvey-Debbie-Murrel-1024x683.jpg",
            "Siblings-Connie-Rogers-Kute-Glenda-Rogers-Wagner-Eddie-Rogers-1024x683.jpg",
            "Teacher-Lyndsey-Raisor-is-served-by-cadets-1024x683.jpg"
        ]
    },
    {
        type: 'event', name: 'homecoming-weekend-2013', year: '2013',
        images: [
            "289-150x150.jpg",
            "290-150x150.jpg",
            "291-150x150.jpg",
            "294-150x150.jpg",
            "295-150x150.jpg",
            "296-150x150.jpg",
            "297-150x150.jpg",
            "301-150x150.jpg",
            "302-150x150.jpg",
            "304-150x150.jpg",
            "305-150x150.jpg",
            "307-150x150.jpg",
            "308-150x150.jpg",
            "313-150x150.jpg",
            "314-150x150.jpg",
            "384-150x150.jpg"
        ]
    },
    {
        type: 'event', name: 'homecoming-weekend-2015', year: '2015',
        images: [
            "2015-alumni-tailgate-11-150x150.jpg",
            "2015-alumni-tailgate-18-150x150.jpg",
            "2015-alumni-tailgate-25-150x150.jpg",
            "2015-alumni-tailgate-29-150x150.jpg",
            "2015-alumni-tailgate-34-150x150.jpg",
            "2015-alumni-tailgate-37-150x150.jpg",
            "2015-alumni-tailgate-38-150x150.jpg",
            "2015-alumni-tailgate-39-150x150.jpg",
            "2015-alumni-tailgate-41-150x150.jpg",
            "2015-alumni-tailgate-42-150x150.jpg",
            "2015-alumni-tailgate-43-150x150.jpg",
            "2015-alumni-tailgate-44-150x150.jpg",
            "2015-alumni-tailgate-45-150x150.jpg",
            "2015-alumni-tailgate-46-150x150.jpg",
            "2015-alumni-tailgate-47-150x150.jpg",
            "2015-Breakfast-2-150x150.jpg",
            "2015-Breakfast-18-150x150.jpg",
            "2015-Breakfast-30-150x150.jpg",
            "2015-Breakfast-48-150x150.jpg",
            "2015-Breakfast-50-150x150.jpg",
            "2015-Breakfast-54-150x150.jpg",
            "2015-Breakfast-70-150x150.jpg",
            "2015-Breakfast-71-150x150.jpg",
            "2015-Breakfast-74-150x150.jpg",
            "2015-Breakfast-78-150x150.jpg",
            "2015-Breakfast-221-150x150.jpg"
        ]
    },
    {
        type: 'event', name: 'homecoming-weekend-2016', year: '2016',
        images: [
            "2016-JV-football-232x300.jpg",
            "Use-3-sistrers-MG_8094-150x150.jpg",
            "use-cadets-serving-food-IMG_7903-150x150.jpg",
            "Use-Field-walk-on-by-famers-IMG_7998-2-150x150.jpg",
            "use-IMG_7870-150x150.jpg",
            "use-IMG_7882-150x150.jpg",
            "use-IMG_7893-150x150.jpg",
            "use-IMG_7896-1-150x150.jpg",
            "use-IMG_7898-150x150.jpg",
            "use-IMG_7900-150x150.jpg",
            "use-IMG_7902-150x150.jpg",
            "use-IMG_7905-2-150x150.jpg",
            "us-eIMG_7925-150x150.jpg",
            "use-IMG_7940-1-150x150.jpg",
            "use-IMG_8091-150x150.jpg",
            "use-IMG_8092-150x150.jpg",
            "use-IMG_8095-150x150.jpg",
            "use-IMG_8108-150x150.jpg",
            "use-IMG_8109-150x150.jpg",
            "use-IMG_8131-150x150.jpg",
            "use-IMG_8164-150x150.jpg",
            "use-IMG_8165-150x150.jpg",
            "use-IMG_8166-150x150.jpg",
            "use-IMG_8167-150x150.jpg",
            "use-IMG_8174-150x150.jpg",
            "use-IMG_8179-1-150x150.jpg",
            "use-IMG_8201-2-150x150.jpg",
            "use-IMG_8202-150x150.jpg",
            "use-Marilyn-Calvert-class-of-1966-Jarid-King-Class-of-2016-1-150x150.jpg",
            "use-Volunteer-award-IMG_7919-150x150.jpg",
        ]
    },
    {
        type: 'event', name: 'spring-luncheon-2019', year: '2019', thumbs: true,
        images: [
            "2019SAL1-1024x983.jpeg",
            "2019SAL3-768x1024.jpeg",
            "2019SAL4jpeg-768x1024.jpeg",
            "2019SAL5-1-768x1024.jpeg",
            "2019SAL6-1024x768.jpeg",
            "2019SAL7-1024x768.jpeg",
            "2019SAL8-768x1024.jpeg",
            "2019SAL9-1024x1016.jpeg",
            "2019SAL10-1024x768.jpeg",
            "2019SAL11-1024x768.jpeg",
            "2019SAL12-1024x768.jpeg",
            "2019SAL13-1024x768.jpeg",
            "2019SAL14-1024x768.jpeg",
            "2019SAL15-1024x1020.jpeg",
            "2019SAL16-1024x768.jpeg",
            "2019SAL17-1024x768.jpeg",
            "2019SAL18-1024x891.jpeg",
            "2019SAL19-1024x965.jpeg",
            "2019SAL20-4-1024x768.jpeg",
            "2019SAL21-1024x768.jpeg",
            "2019SAL22-1-1024x768.jpeg",
            "2019SAL23-1024x768.jpeg",
            "2019SAL24-1024x768.jpeg",
            "2019SAL25-1-1024x768.jpeg",
            "2019SAL26-1-1024x768.jpeg",
            "2019SAL26-1024x768.jpeg",
            "2019SAL27-1024x768.jpeg",
            "2019SAL28-1-1024x526.jpeg",
            "2019SAL29-768x1024.jpeg",
            "2019SAL30-782x1024.jpeg",
            "2019SAL31-768x1024.jpeg",
            "2019SAL32-1024x768.jpeg",
            "2019SAL33-1024x768.jpeg",
            "2019SAL34-2-768x1024.jpeg",
            "2019SAL35-768x1024.jpeg",
            "2019SAL36-1024x768.jpeg",
            "2019SAL37-1024x768.jpeg",
            "2019SAL38-1024x768.jpeg",
            "2019SAL39-1024x768.jpeg",
            "2019SAL40-768x1024.jpeg",
            "2019SAL41-768x1024.jpeg",
            "2019SAL42-1024x768.jpeg",
            "2019SAL43-768x1024.jpeg",
            "2019SAL44-768x1024.jpeg",
            "2019SAL45-1024x768.jpeg",
            "2019SAL46-1024x768.jpeg",
            "2019SAL47-1024x768.jpeg",
            "2019SAL48-1024x768.jpeg",
            "2019SAL49-1024x768.jpeg",
            "2019SAL50-1024x768.jpeg",
            "2019SAL51-1024x768.jpeg",
            "2019SAL52-1024x768.jpeg",
            "2019SAL53-2-1024x768.jpeg",
            "2019SAL54-3-1024x768.jpeg",
            "I2019SAL2-768x1024.jpeg",
        ]
    },
    {
        type: 'reunion', name: '61-reunion-2018', year: '2018',
        images: [
            "2018-61-Reunion-DSC_0001-150x150.jpg",
            "2018-61-Reunion-DSC_0003-150x150.jpg",
            "2018-61-Reunion-DSC_0005-150x150.jpg",
            "2018-61-Reunion-DSC_0006-150x150.jpg",
            "2018-61-Reunion-DSC_0009-150x150.jpg",
            "2018-61-Reunion-DSC_0010-150x150.jpg",
            "2018-61-Reunion-DSC_0011-1-150x150.jpg",
            "2018-61-Reunion-DSC_0012-150x150.jpg",
            "2018-61-Reunion-DSC_0015-150x150.jpg",
            "2018-61-Reunion-DSC_0020-150x150.jpg",
            "2018-61-Reunion-DSC_0021-150x150.jpg",
            "2018-61-Reunion-DSC_0022-150x150.jpg",
            "2018-61-Reunion-p4-Display-1-150x150.jpg",
            "2018-61-Reunion-p4-guy-p5-wife-150x150.jpg",
            "2018-61-Reunion-p4-signing-in-150x150.jpg",
            "2018-61-Reunion-p4-Table-150x150.jpg",
            "2018-61-Reunion-p5-table-150x150.jpg",
            "2018-61-Reunion-p6-table-high-150x150.jpg",
            "2018-61-Reunion-p6-table-low-150x150.jpg",
            "2018-61-Reunion-p8-toothpick-man-150x150.jpg",
            "2018-61-Reunion-p9-table-150x150.jpg",
        ]
    },
    {
        type: 'reunion', name: '87-reunion-2017', year: '2017',
        images: [
            "2017-class-87-1-150x150.jpeg",
            "2017-class-87-2-150x150.jpeg",
            "2017-class-87-3-150x150.jpeg",
            "2017-class-87-4-150x150.jpeg",
            "2017-class-87-5-150x150.jpeg",
            "2017-class-87-6--150x150.jpeg",
            "2017-class-87-7-150x150.jpeg",
            "2017-class-87-8-150x150.jpeg",
            "2017-class-87-9-150x150.jpeg",
            "2017-class-87-10-150x150.jpeg",
            "2017-class-87-11-150x150.jpeg",
        ]
    },
];

const isArray = a => {
    return Object.prototype.toString.call(a) === "[object Array]";
}
const make = desc => {
    if (!isArray(desc)) {
        return make.call(this, Array.prototype.slice.call(arguments));
    }

    var name = desc[0];
    var attributes = desc[1];

    var el = document.createElement(name);

    var start = 1;
    if (typeof attributes === "object" && attributes !== null && !isArray(attributes)) {
        for (var attr in attributes) {
            el[attr] = attributes[attr];
        }
        start = 2;
    }

    for (var i = start; i < desc.length; i++) {
        if (isArray(desc[i])) {
            el.appendChild(make(desc[i]));
        }
        else {
            el.appendChild(document.createTextNode(desc[i]));
        }
    }

    return el;
}

const buildGallery = galImgs => {
    // dig into each album first and then 
    for (let i = 0; i < galImgs.length; i++) {
        let item = galImgs[i];
        let folder = `${galleryDir}${item.type}s/${item.name}/`;
        let thumbUri = item.thumbs ? 'thumbs/' : '';

        // create thumbnail element for each image
        for (let j = 0; j < item.images.length; j++) {
            let image = item.images[j];
            let fullthumbUri = `${folder}${thumbUri}${image}`;
            let fullUri = `${folder}${image}`;
            // builds the element e.g. <div><img/></div> 
            let imageNode = make([
                'div', { className: 'column is-2-tablet is-6' },
                ['img', { className: 'lozad' }]
            ]);
            imageNode.querySelector('img').setAttribute('data-src', fullthumbUri);
            // lightbox click event
            imageNode.addEventListener('click', () => {
                basicLightbox.create(`<img src="${fullUri}" />`).show();
            }, false);
            // finally add it to the gallery
            gallery.appendChild(imageNode);

            // at the end of adding nodes, rerun the lazy observer
            if (i === galImgs.length - 1 && j === item.images.length - 1) {
                observer.observe();
            }
        }
    }
}

export const setupGallery = () => {
    if (gallery) {
        observer.observe(); // lazy load observer for scrolling
        buildGallery(galleryItems);
    }
}

export default setupGallery;