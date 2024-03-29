const DocMenuConfig = [
  {
    pages: [
      {
        heading: "داشبورد",
        route: "dashboard",
        svgIcon: "dashboard",
      },
    ],
  },

  {
    heading: "فروش",
    route: "",
    pages: [
      {
        sectionTitle: "کاتالوگ",
        route: "",
        svgIcon: "store",
        sub: [
          {
            sectionTitle: "دسته بندی ",
            route: "categories index",
            sub: [
              {
                heading: "دسته بندی ها",
                route: "categories index",
              },
              {
                heading: "بنرها",
                route: "categories banners index",
              },
            ],
          },
          {
            heading: "گارانتی ها",
            route: "warranties index",
          },
          {
            heading: "برندها",
            route: "brands index",
          },
          {
            heading: "ویژگی ها",
            route: "features index",
          },
          {
            heading: "تنوع ها",
            route: "variants index",
          },
          {
            heading: "محصولات",
            route: "products index",
          },

          {
            heading: "کد تخفیف ",
            route: "vouchers index",
          },
          {
            heading: "محصولات شگفت انگیز",
            route: "products incredibles index",
          },

          {
            heading: "دسته بندی های پیشنهادی",
            route: "recommendations index",
          },

          // {
          //   heading: "موجودی ها",
          //   route: "",
          // },
        ],
      },
      {
        sectionTitle: "سفارشات",
        route: "",
        svgIcon: "shopping-bag",
        sub: [
          {
            heading: "سفارش ها",
            route: "orders index",
          },

          // {
          //   heading: "فاکتور",
          //   route: "",
          // },
        ],
      },

      // {
      //   sectionTitle: "آمار",
      //   route: "",
      //   svgIcon: "chart-square",
      //   sub: [
      //     {
      //       heading: "گزارش و آمار",
      //       route: "",
      //     },
      //   ],
      // },
    ],
  },

  {
    heading: "نظرات و پرسش ها",
    route: "",
    pages: [
      {
        heading: "نظرات",
        route: "comments index",
        svgIcon: "messages",
      },
      {
        heading: "پرسش ها",
        route: "questions index",
        svgIcon: "messages",
      },
      {
        heading: "عناوین امتیاز نظرات",
        route: "score models index",
        svgIcon: "messages",
      },
    ],
  },


  {
    heading: "کاربران",
    route: "",
    pages: [
      {
        sectionTitle: " کاربران",
        route: "users index",
        svgIcon: "group",
        sub: [
          {
            heading: "لیست کاربران",
            route: "users index",
          },
        ],
      },

      {
        sectionTitle: " نقش های کاربری",
        route: "/roles/",
        svgIcon: "shield-quarter",

        sub: [
          {
            heading: "لیست مجوزها",
            route: "permissions index",
          },
          {
            heading: "لیست نقش های کاربری",
            route: "roles index",
          },
        ],
      },
    ],
  },

  {
    heading: "بهبود و طراحی",
    route: "",
    pages: [
      // {
      //   sectionTitle: "ماژول ها",
      //   route: "",
      //   svgIcon: "selection",
      //   sub: [
      //     {
      //       heading: "لیست ماژول ها",
      //       route: "",
      //     },

      //   ],
      // },

      {
        sectionTitle: "طراحی و قالب",
        route: "",
        svgIcon: "slider-alt",
        sub: [
          {
            heading: "تنظیمات",
            route: "setting variables index",
          },
          // {
          //   heading: "ساختار ایمیل",
          //   route: "",
          // },

          // {
          //   heading: "تنظیمات تصاویر",
          //   route: "",
          // },

          // {
          //   heading: "موقعیت ها",
          //   route: "",
          // },
          {
            heading: "بنرها",
            route: "setting banners index",
          },

          {
            heading: "صفحات",
            route: "setting pages index",
          },
        ],
      },
    ],
  },

  {
    heading: "محتوا",
    route: "",
    pages: [
      {
        sectionTitle: "مقالات",
        route: "",
        svgIcon: "news",
        sub: [
          {
            heading: "مقالات",
            route: "articles index",
          },
        ],
      },
    ],
  },

  {
    heading: "ارسال",
    route: "",
    pages: [
      {
        sectionTitle: "ارسال",
        route: "",
        svgIcon: "car",
        sub: [
          {
            heading: "روش های ارسال",
            route: "shipments index",
          },
          {
            heading: "انوع  ارسال کالا",
            route: "deliveries index",
          },

          {
            heading: "استان ها",
            route: "states index",
          },
          {
            heading: "شهر ها",
            route: "cities index",
          },
        ],
      },
    ],
  },

  {
    heading: "پرداخت",
    route: "",
    pages: [
      {
        sectionTitle: "  پرداخت",
        route: "",
        svgIcon: "card",

        sub: [
          {
            heading: "روش های پرداخت",
            route: "payment-methods-index",
          },
          {
            heading: "تنظیمات",
            route: "",
          },
        ],
      },
    ],
  },
  // {
  //   heading: "بازاریابی",
  //   route: "",
  //   pages: [
  //     {
  //       sectionTitle: "  بازاریابی",
  //       route: "",
  //       svgIcon: "party",
  //       sub: [
  //         {
  //           heading: "Google",
  //           route: "",
  //         },
  //         {
  //           heading: "Whatsapp",
  //           route: "",
  //         },
  //         {
  //           heading: "Telegram",
  //           route: "",
  //         },
  //       ],
  //     },
  //   ],
  // }
];

export default DocMenuConfig;
