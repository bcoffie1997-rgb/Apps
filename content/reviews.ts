/**
 * Real customer reviews for prospect previews, found on public review sites (Yelp via MapQuest, Yellow Pages,
 * Booksy, Nextdoor, Google, the business's own site). Quotes are the customer's own words. Keyed by preview slug.
 * Only matched by name + address/phone. Edit freely — remove any the owner doesn't want shown.
 */
export type Review = { quote: string; name: string; source: string; url: string };

export const REVIEWS: Record<string, Review[]> = {
  "magic-touch-barber-shop": [
    {
      "quote": "Best barbers in South Florida. I've been coming here since they opened, now I live is West Palm Beach and I still make the trip to get my hair cut here.",
      "name": "Desmond C.",
      "source": "Yelp",
      "url": "https://www.mapquest.com/us/florida/magic-touch-barber-shop-4478444"
    },
    {
      "quote": "We love Woody. He has been the family barber for 3 generations.",
      "name": "Mahatma P.",
      "source": "Yelp",
      "url": "https://www.mapquest.com/us/florida/magic-touch-barber-shop-4478444"
    },
    {
      "quote": "My son was overdue for a haircut and nick gave him a great mid skin fade.",
      "name": "Angela R.",
      "source": "Yelp",
      "url": "https://www.mapquest.com/us/florida/magic-touch-barber-shop-4478444"
    }
  ],
  "doggy-studio-grooming-and-mobile-grooming": [
    {
      "quote": "My puppy has been going to Doggy Studio since his first grooming and he loves it!!! He looks and smells amazing everytime and gets SO EXCITED before every trip there!",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "I've been taking my Maltipoo to Doggy Studio for years after trying other grooming services and this by far is the best!",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "I have been using Doggy Studio for at least eight years they are awesome and would highly recommend their services.",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "diva-beauty-bar": [
    {
      "quote": "Got a pedicure by Rosie & it was a dream I was very much relaxed & she was also very kind to me. Deluxe pedicure is definitely worth it!",
      "name": "Allison B.",
      "source": "Yelp",
      "url": "https://www.mapquest.com/us/florida/diva-nail-bar-374026239"
    },
    {
      "quote": "Always so clean and professional and always fast! Fastest fill with gel polish I've ever had!",
      "name": "Deanna J.",
      "source": "Yelp",
      "url": "https://www.mapquest.com/us/florida/diva-nail-bar-374026239"
    },
    {
      "quote": "This place is awesome!! Personal attention, very clean and professional!! This is my \"go to\" place!!",
      "name": "Sheri T.",
      "source": "Yelp",
      "url": "https://www.mapquest.com/us/florida/diva-nail-bar-374026239"
    }
  ],
  "marty-s-complete-automotive": [
    {
      "quote": "Marty has been our family’s one stop shop for Auto needs for many years. He has changed the oil, kept our cars running smoothly always with a smile.",
      "name": "",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/martys-complete-automotive-482424655"
    }
  ],
  "oakland-auto-center": [
    {
      "quote": "I have been bringing my automobiles to Oakland Auto for many years. Marty and Missy are the best as far as excellent service, promptness and professionalism.",
      "name": "Jack C.",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/oakland-auto-center-7348650"
    }
  ],
  "hot-tips-nail-salon": [
    {
      "quote": "They are very friendly. Do a GREAT job and you'll Keep going back.",
      "name": "",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/coconut-creek-fl/mip/hot-tips-salon-15626549"
    }
  ],
  "ace-of-fadez-barbershop": [
    {
      "quote": "Kike is #1. Great service , great attitude and most importantly best barber around 5/5!! Shop is super clean too",
      "name": "Derrick G.",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/sunrise-fl/mip/ace-of-fadez-barbershop-541113284"
    }
  ],
  "mimi-nails-and-spa": [
    {
      "quote": "The best set of nails I have had done in at least 20 years. I was late for my appointment and they still made space for me.",
      "name": "Beth G.",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/mimi-nails-inc-467644528"
    },
    {
      "quote": "Excellent nail tech! Mimi does the most natural looking nail extensions in Fort Lauderdale hands down! She has a wonderful staff.",
      "name": "",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/mimi-nails-inc-467644528"
    },
    {
      "quote": "Mimi is the best nail tech I have ever had if you want a really good pedicure make sure you see J.",
      "name": "Erica D.",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/mimi-nails-inc-467644528"
    }
  ],
  "montenegro-lawn-service": [
    {
      "quote": "The Montenegro brothers have kept my property looking great for over 10 years. They always show up on time and are quick to handle any special request I have.",
      "name": "Kent J.",
      "source": "Business website",
      "url": "https://montenegrolawnservice.com/"
    },
    {
      "quote": "Excellent and detailed service and the staff is super friendly and professional. I have used their services for many years and they always leave my yard looking immaculate.",
      "name": "Kanny S.",
      "source": "Business website",
      "url": "https://montenegrolawnservice.com/"
    },
    {
      "quote": "By far the best landscape company I've come across in years! They are hard working, surpassed my expectations and go the extra mile.",
      "name": "Harrison U.",
      "source": "Business website",
      "url": "https://montenegrolawnservice.com/"
    }
  ],
  "lovely-nails-inc": [
    {
      "quote": "Great service! Sarah was amazing and took great care of me even thought i came so late lol. Will recommend!",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "Excellent customer service Vincent and Sarah are the best!!!!",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "Great customer service! Very gentle and asks a lot of questions.",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "cafeteria-y-pupuseria-el-proveedor": [
    {
      "quote": "The best food in Fort Lauderdale. La major comida en Fort Lauderdale.Todo Perfecto y limpio yo recomendo.",
      "name": "Luis B.",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/pupuseria-y-cafeteria-el-proveedor-527827517"
    }
  ],
  "botanica-san-lazaro": [
    {
      "quote": "i had a great reading with Leslie , she suggested things I needed and recommended as well as gave clarity, I will be back for sure.",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "Best place in the world very powerful and helpful trust me u will see everything come true",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "rothe-s-auto-repair": [
    {
      "quote": "They provide great efficient courteous service at very good pricing. Nothing is done to the vehicle without prior consultation with the owner.",
      "name": "Alan H.",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/rothes-auto-repair-481063868"
    },
    {
      "quote": "On top of being honest, these guys are extremely polite and the prices are reasonable. If you need auto repair work done, skip the dealer and go straight to Rothes!",
      "name": "",
      "source": "Yellow Pages",
      "url": "https://www.yellowpages.com/oakland-park-fl/mip/rothes-auto-repair-481063868"
    },
    {
      "quote": "Came highly recommended by another HVAC company. They weren't wrong. Great communication and timely, professional service. Thanks, Mike!",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "creative-needle-tailoring": [
    {
      "quote": "Great service, they were open even on sunday. I left my pants, same day in 1 hour, all were ready to pick up.",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "micheal was so helpful and his work is perfect couldn’t recommend more!",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "Amazing service, did one day turnaround on some custom grill covers for our green egg on the yacht I work on. Definitely recommend!",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "k-and-g-caribbean-flavors": [
    {
      "quote": "If you're looking for consistently good food and great service, this spot never disappoints. Everything I've tried has been on point every single time.",
      "name": "Jess W.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/k-and-g-caribbean-flavors-lauderhill"
    },
    {
      "quote": "This new restaurant is definitely a gem!! They serve both Haitian and American food.",
      "name": "Julie L.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/k-and-g-caribbean-flavors-lauderhill"
    }
  ],
  "caribbean-pot-on-wheels-jerk-center": [
    {
      "quote": "This place was super clean. The ambience was very quaint and relaxing. Great place to go for a small happy hour with good food.",
      "name": "Collin F.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/caribbean-pot-on-wheels-jerk-center-lauderhill"
    },
    {
      "quote": "I left with a jerk chicken dinner. The chicken was nicely seasoned, tender, and fell off the bone.",
      "name": "Rich D.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/caribbean-pot-on-wheels-jerk-center-lauderhill"
    }
  ],
  "the-real-cut": [
    {
      "quote": "Best barber in Fort Lauderdale, I’ve been getting my haircut from Frantz for almost 12 years. He is very professional, positive, and easygoing.",
      "name": "Richardson P.",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/629724_the-real-cut_hair-salon_15643_fort-lauderdale"
    },
    {
      "quote": "Great service best in broward county!",
      "name": "Alex T.",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/629724_the-real-cut_hair-salon_15643_fort-lauderdale"
    }
  ],
  "kendall-kafe": [
    {
      "quote": "A great hidden gem. The food was delicious, great customer service, and very reasonably priced. I highly recommend this restaurant.",
      "name": "Amlee S.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/kendall-kafe-tamarac"
    },
    {
      "quote": "Perfect little diner across from the soccer fields. glad we found this place because the food is great and the prices are amazing. Service was quick and we were in and out in 20 minutes.",
      "name": "Todd K.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/kendall-kafe-tamarac"
    },
    {
      "quote": "Came for breakfast and was really delighted!! Their coffee was excellent no bitterness!!",
      "name": "Janette M.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/kendall-kafe-tamarac"
    }
  ],
  "next-day-alterations": [
    {
      "quote": "I rarely give a business five stars. This one deserves it. Finding a skilled Taylor for alterations is tricky.",
      "name": "Danielle A.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/next-day-alterations-fort-lauderdale"
    },
    {
      "quote": "I've been going to Anita and using her business for almost a year now and will never go anywhere else.",
      "name": "Marla S.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/next-day-alterations-fort-lauderdale"
    }
  ],
  "mercadito-latino": [
    {
      "quote": "I finally did and was wonderfully surprised to see that they serve hot, fresh food every day.",
      "name": "Marie M.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/mercadito-latino-fort-lauderdale"
    },
    {
      "quote": "I eat here often. As an old school Tampanian this is grandmas Sunday cooking.",
      "name": "Virgil James K.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/mercadito-latino-fort-lauderdale"
    }
  ],
  "la-casa-del-pan-bakery-and-restaurant": [
    {
      "quote": "This place has excellent Mexican pastries. As good or better than most pananderias I've been to in SoCal. The rolled dulce de leche and coconut is especially great.",
      "name": "Greg M.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/la-casa-del-pan-bakery-and-restaurant-oakland-park"
    },
    {
      "quote": "This is THE BEST Mexican food in Wilton Manors, Fort Lauderdale and Oakland Park!! It's so fresh and absolutely delicious!!",
      "name": "David V.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/la-casa-del-pan-bakery-and-restaurant-oakland-park"
    },
    {
      "quote": "The bakery goods all look amazing. We had a pastry that was stuffed with a vanilla cream. It tasted fresh.",
      "name": "Sherry W.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/la-casa-del-pan-bakery-and-restaurant-oakland-park"
    }
  ],
  "uldas-professional-beauty-nails-and-spa": [
    {
      "quote": "Katty did an amazing job! She's super sweet and nails look beautiful!",
      "name": "Jennifer",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/722057_uldas-professional-beauty-nails-spa_nail-salon_15643_fort-lauderdale"
    },
    {
      "quote": "Absolutely love the vibe and attention to detail! They definitely delivered on service and skills!",
      "name": "Elizabeth",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/722057_uldas-professional-beauty-nails-spa_nail-salon_15643_fort-lauderdale"
    },
    {
      "quote": "Love this place, incredible energy and excellent service obviously perfection",
      "name": "Sindy",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/722057_uldas-professional-beauty-nails-spa_nail-salon_15643_fort-lauderdale"
    }
  ],
  "liso-dominican-salon": [
    {
      "quote": "I can’t say enough good things about María. My hair was in really rough shape, but she took such good care of me.",
      "name": "Circe",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/1449261_liso-dominican-salon_hair-salon_15643_fort-lauderdale"
    },
    {
      "quote": "Maria was timely and did an amazing job and moved quickly! Definitely will be back!",
      "name": "Josie",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/1449261_liso-dominican-salon_hair-salon_15643_fort-lauderdale"
    },
    {
      "quote": "So happy with my silk press, Maria is the best!",
      "name": "Isabella",
      "source": "Booksy",
      "url": "https://booksy.com/en-us/1449261_liso-dominican-salon_hair-salon_15643_fort-lauderdale"
    }
  ],
  "affectionate-pet-grooming": [
    {
      "quote": "I took my frenchie here for the very first time and got grooming for a very reasonable price! Had a great experience and my dog is very clean:)",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "We picked her up 2 hours later and she was ready on time, and she looked fabulous. What a great find. Thank you Peter for a very professional job done on our little one.",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "lotus-lash-and-nail-spa": [
    {
      "quote": "Lotus was a great experience! Today was my first time here and I already look forward to coming back. Top notch customer service and my nail specialist (Mia) did a great job with my nails.",
      "name": "Brenda R.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/lotus-lash-and-nail-spa-tamarac"
    },
    {
      "quote": "Always make time for self care! Lovely new spa. Great service! My feet feel great and my toes are too cute!",
      "name": "Mariah M.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/lotus-lash-and-nail-spa-tamarac"
    },
    {
      "quote": "New favorite nail spa. This beautifully decorated nail spa in Tamarac just opened about two weeks ago.",
      "name": "Luz M.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/lotus-lash-and-nail-spa-tamarac"
    }
  ],
  "botanica-tomasa-francis": [
    {
      "quote": "Just left and had the most amazing ICONIC experience with VIOLET!! She was sooo helpful and very informative!",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "I absolutely love this store! From the moment I walked in, I felt a sense of peace and calm.",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "The staff is kind and friendly, and they make you feel genuinely welcome.",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "mercado-latino-international-market": [
    {
      "quote": "People were kind n attentive. The store is packed with a wide variety of goods to cater to almost any nationality. The place is clean.",
      "name": "",
      "source": "Google",
      "url": ""
    },
    {
      "quote": "You find everything - fresh Latin food and you find it many varieties.",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "mexican-supermarket": [
    {
      "quote": "THE BEST TACOS IN SOUTH FLORIDA! Amazing prices and delicious food! The workers are so helpful and nice when explaining the menu!",
      "name": "Tamara M.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/mexican-supermarket-pompano-beach"
    },
    {
      "quote": "Outstanding ! For a supermarket and corner store this place had it all ! Good hot food served right as you wait.",
      "name": "Michael O.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/mexican-supermarket-pompano-beach"
    },
    {
      "quote": "The food was exclent. Al Pator was the best. I will definitely be back.",
      "name": "",
      "source": "Google",
      "url": ""
    }
  ],
  "handyman-pros": [
    {
      "quote": "They’ve done work at my house and I referred them to my vet and they’re currently adding impact windows to her home as well as some structural work.",
      "name": "D. S.",
      "source": "Nextdoor",
      "url": "https://nextdoor.com/pages/handyman-oakland-park-fl/"
    }
  ],
  "unique-air-conditioning": [
    {
      "quote": "Unique A/C is spot on !!! The tech Conrad did a outstanding job !! Norret and his staff are every helpful . I totally recommend Unique A/C .",
      "name": "Sam T.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/unique-air-conditioning-lauderdale-lakes"
    }
  ],
  "s-o-s-alterations": [
    {
      "quote": "I am beyond grateful for the incredible work this seamstress did on my wedding dress. I'm getting married on 2/01/2026 and cannot wait to wear it!",
      "name": "Karla D.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/sos-alterations-and-designs-margate"
    },
    {
      "quote": "Was so happy w my drapes it was a lot of work and I'm so glad I found her. She visited and gave me an estimate and did the work. Would highly recommend",
      "name": "Tammy V.",
      "source": "Yelp",
      "url": "https://www.yelp.com/biz/sos-alterations-and-designs-margate"
    }
  ]
};
