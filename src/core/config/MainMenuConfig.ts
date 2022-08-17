const DocMenuConfig = [
  {
    pages: [
      {
        heading: "داشبورد",
        route: "dashboard",
        svgIcon: "user-circle",
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
                heading: "اسلایدر",
                route: "categories slides index",
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
          // {
          //   heading: "تخفیف ها",
          //   route: "",
          // },
          // {
          //   heading: "محصولات شگفت انگیز",
          //   route: "",
          // },

          // {
          //   heading: "موجودی ها",
          //   route: "",
          // },

        ],
      },

      // {
      //   sectionTitle: "pages",
      //   route: "",
      //   svgIcon: "media/icons/duotune/general/gen022.svg",
      //   fontIcon: "bi-archive",
      //   sub: [
      //     {
      //       sectionTitle: "profile",
      //       route: "/profile",
      //       sub: [
      //         {
      //           heading: "profileOverview",
      //           route: "",
      //         },
      //         {
      //           heading: "projects",
      //           route: "",
      //         },
      //         {
      //           heading: "campaigns",
      //           route: "",
      //         },
      //         {
      //           heading: "documents",
      //           route: "",
      //         },
      //         {
      //           heading: "connections",
      //           route: "",
      //         },
      //         {
      //           heading: "activity",
      //           route: "",
      //         },
      //       ],
      //     },

      //   ],
      // },

      // {
      //   sectionTitle: "سفارشات",
      //   route: "",
      //   svgIcon: "shopping-bag",
      //   sub: [
      //     {
      //       heading: "سفارش ها",
      //       route: "",
      //     },

      //     {
      //       heading: "فاکتور",
      //       route: "",
      //     },
      //   ],
      // },


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

  // {
  //   heading: "بهبود و طراحی",
  //   route: "",
  //   pages: [
  //     {
  //       sectionTitle: "ماژول ها",
  //       route: "",
  //       svgIcon: "selection",
  //       sub: [
  //         {
  //           heading: "لیست ماژول ها",
  //           route: "",
  //         },

  //       ],
  //     },

  //     {
  //       sectionTitle: "طراحی و قالب",
  //       route: "",
  //       svgIcon: "slider-alt",
  //       sub: [
  //         {
  //           heading: "قالب و لوگو",
  //           route: "",
  //         },
  //         {
  //           heading: "ساختار ایمیل",
  //           route: "",
  //         },

  //         {
  //           heading: "تنظیمات تصاویر",
  //           route: "",
  //         },

  //         {
  //           heading: "موقعیت ها",
  //           route: "",
  //         },
  //         {
  //           heading: "صفحه ها",
  //           route: "",
  //         },

  //       ],
  //     },

  //   ],
  // },



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
            heading: "استان ها",
            route: "states index",
          },

        ],
      },
    ],
  },
  // {
  //   heading: "پرداخت",
  //   route: "",
  //   pages: [
  //     {
  //       sectionTitle: "  پرداخت",
  //       route: "",
  //       svgIcon: "card",

  //       sub: [
  //         {
  //           heading: "روش های پرداخت",
  //           route: "payment_methods index",
  //         },
  //         {
  //           heading: "تنظیمات",
  //           route: "",
  //         },
  //       ],
  //     },
  //   ],
  // },
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
