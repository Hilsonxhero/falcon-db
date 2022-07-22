const DocMenuConfig = [
  {
    pages: [
      {
        heading: "داشبورد",
        route: "/dashboard",
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
            heading: "دسته بندی ها",
            route: "categories",
          },
          {
            heading: "برندها",
            route: "brands",
          },
          {
            heading: "مشخصه و ویژگی ها",
            route: "attributes",
          },
          {
            heading: "تخفیف ها",
            route: "discounts",
          },
          {
            heading: "محصولات",
            route: "products",
          },

          {
            heading: "محصولات شگفت انگیز",
            route: "incredible-offers",
          },

          {
            heading: "موجودی ها",
            route: "stocks",
          },

        ],
      },

      {
        sectionTitle: "سفارشات",
        route: "",
        svgIcon: "shopping-bag",
        sub: [
          {
            heading: "سفارش ها",
            route: "orders",
          },

          {
            heading: "فاکتور",
            route: "invoices",
          },
        ],
      },


      {
        sectionTitle: "آمار",
        route: "",
        svgIcon: "chart-square",
        sub: [
          {
            heading: "گزارش و آمار",
            route: "stats",
          },
        ],
      },

    ],
  },


  {
    heading: "کاربران",
    route: "/users",
    pages: [
      {
        sectionTitle: " کاربران",
        route: "users",
        svgIcon: "group",
        sub: [
          {
            heading: "لیست کاربران",
            route: "users",
          },

        ],
      },

      {
        sectionTitle: " نقش های کاربری",
        route: "permissions",
        svgIcon: "shield-quarter",

        sub: [
          {
            heading: "لیست مجوزها",
            route: "permissions",
          },
          {
            heading: "لیست نقش های کاربری",
            route: "roles",
          },

        ],
      },

    ],
  },

  {
    heading: "بهبود و طراحی",
    route: "",
    pages: [
      {
        sectionTitle: "ماژول ها",
        route: "modules",
        svgIcon: "selection",
        sub: [
          {
            heading: "لیست ماژول ها",
            route: "modules",
          },

        ],
      },

      {
        sectionTitle: "طراحی و قالب",
        route: "",
        svgIcon: "slider-alt",
        sub: [
          {
            heading: "قالب و لوگو",
            route: "themes",
          },
          {
            heading: "ساختار ایمیل",
            route: "mail_theme",
          },

          {
            heading: "تنظیمات تصاویر",
            route: "mail-theme",
          },

          {
            heading: "موقعیت ها",
            route: "locations",
          },
          {
            heading: "صفحه ها",
            route: "pages",
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
        route: "shipments",
        svgIcon: "car",
        sub: [
          {
            heading: "روش های ارسال",
            route: "shipments",
          },
          {
            heading: "تنظیمات",
            route: "shipment-setting",
          },
        ],
      },
    ],
  },
  {
    heading: "پرداخت",
    route: "payments",
    pages: [
      {
        sectionTitle: "  پرداخت",
        route: "payments",
        svgIcon: "card",

        sub: [
          {
            heading: "روش های پرداخت",
            route: "payment-methods",
          },
          {
            heading: "تنظیمات",
            route: "payment-setting",
          },
        ],
      },
    ],
  },
  {
    heading: "بازاریابی",
    route: "",
    pages: [
      {
        sectionTitle: "  بازاریابی",
        route: "marketing",
        svgIcon: "party",
        sub: [
          {
            heading: "Google",
            route: "google-marketing",
          },
          {
            heading: "Whatsapp",
            route: "whatsapp-marketing",
          },
          {
            heading: "Telegram",
            route: "telegram-marketing",
          },
        ],
      },
    ],
  }

];

export default DocMenuConfig;
