import { ISimpleCategory } from 'types/category.types'
export const getCategoryTreeByIdPath = (
  path: number[]
): ISimpleCategory | undefined => {
  if (path.length === 1) {
    return categoryTree.find((c) => c.id === path[0])
  }
  if (path.length === 2) {
    const category = categoryTree.find((c) => c.id === path[0])
    return category?.children?.find((sc) => sc.id === path[1])
  }
  return
}
export const getSubCategoryBlockId = (id: number) => {
  return `sc_${id}`
}
export const categoryTree: ISimpleCategory[] = [
  {
    id: 24,
    parent_id: 0,
    name: 'Acrylic Sign Products',
    is_visible: true,
    url: '/acrylic-sign-products/',
    description:
      'We carry a wide range of countertop sign holders, business card holders, wall mount holders, ballot boxes, merchandise holders to provide the versatility in different POP display applications. Customize is available.',
    main_image: {
      src: '/categories/Acrylic Sign Products.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/01-Acrylic-Sign-Products.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/01-Acrylic-Sign-Products.jpg',
        width: 1,
        height: 1,
      },
      {
        src: '/menu-categories/01-Acrylic-Sign-Products.jpg',
        width: 1,
        height: 1,
      },
    ],
    children: [
      {
        id: 101,
        parent_id: 24,
        name: 'Print Protectors',
        is_visible: true,
        url: '/acrylic-sign-products/print-protectors/',
        children: [],
      },
      {
        id: 39,
        parent_id: 24,
        name: 'Business Card Holder',
        is_visible: true,
        url: '/acrylic-sign-products/business-card-holder/',
        images: [
          {
            src: '/logo/logo.png',
            width: 1,
            height: 1,
          },
          { src: '/bg/home.png', width: 4, height: 2 },
          { src: '/bg/sign-up.jpeg', width: 8, height: 5 },
        ],
        children: [],
      },
      {
        id: 40,
        parent_id: 24,
        name: 'Literature & Brochure Holder',
        is_visible: true,
        url: '/acrylic-sign-products/literature-brochure-holder/',
        children: [],
      },
      {
        id: 41,
        parent_id: 24,
        name: 'Countertop Sign Holder',
        is_visible: true,
        url: '/acrylic-sign-products/countertop-sign-holder/',
        children: [
          {
            id: 82,
            parent_id: 41,
            name: 'Slanted Sign Holder',
            is_visible: true,
            url:
              '/acrylic-sign-products/countertop-sign-holder/slanted-sign-holder/',
            children: [],
          },
          {
            id: 83,
            parent_id: 41,
            name: 'Magnetic Sign Holder',
            is_visible: true,
            url:
              '/acrylic-sign-products/countertop-sign-holder/magnetic-sign-holder/',
            children: [],
          },
          {
            id: 84,
            parent_id: 41,
            name: 'Double Sided Tent Sign Holder',
            is_visible: true,
            url:
              '/acrylic-sign-products/countertop-sign-holder/double-sided-tent-sign-holder/',
            children: [],
          },
          {
            id: 85,
            parent_id: 41,
            name: 'Other',
            is_visible: true,
            url: '/acrylic-sign-products/countertop-sign-holder/other/',
            children: [],
          },
          {
            id: 81,
            parent_id: 41,
            name: 'T-Base Sign Holder',
            is_visible: true,
            url:
              '/acrylic-sign-products/countertop-sign-holder/t-base-sign-holder/',
            children: [],
          },
        ],
      },
      {
        id: 42,
        parent_id: 24,
        name: 'Clear Ballot Boxes',
        is_visible: true,
        url: '/acrylic-sign-products/clear-ballot-boxes/',
        children: [],
      },
    ],
  },
  {
    id: 25,
    parent_id: 0,
    name: 'Backdrop Stands & Pop–Up Display',
    is_visible: true,
    url: '/backdrop-stands-pop-up-display/',
    description:
      'Exhibition display presents a visual representation of a company’s brand and products, which is ideal for the trade show display, convention conferences, retail promotion and more events.',
    main_image: {
      src: '/categories/Backdrop Stand.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/02-Backdrop-Stands-&-Pop-Up-Display.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/02-Backdrop-Stands-&-Pop-Up-Display.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 43,
        parent_id: 25,
        name: 'Telescoping Backdrop Banner Stands',
        is_visible: true,
        url:
          '/backdrop-stands-pop-up-display/telescoping-backdrop-banner-stands/',
        children: [],
      },
      {
        id: 44,
        parent_id: 25,
        name: 'BEAVER™ Pop-Up Display System',
        is_visible: true,
        url: '/backdrop-stands-pop-up-display/beavertm-pop-up-display-system/',
        children: [
          {
            id: 86,
            parent_id: 44,
            name: 'Curve Table Top',
            is_visible: true,
            url:
              '/backdrop-stands-pop-up-display/beavertm-pop-up-display-system/curve-table-top/',
            children: [],
          },
          {
            id: 87,
            parent_id: 44,
            name: 'Curve 8-FT. High',
            is_visible: true,
            url:
              '/backdrop-stands-pop-up-display/beavertm-pop-up-display-system/curve-8-ft-high/',
            children: [],
          },
          {
            id: 88,
            parent_id: 44,
            name: 'Straight 8-FT. High',
            is_visible: true,
            url:
              '/backdrop-stands-pop-up-display/beavertm-pop-up-display-system/straight-8-ft-high/',
            children: [],
          },
          {
            id: 89,
            parent_id: 44,
            name: 'Parts',
            is_visible: true,
            url:
              '/backdrop-stands-pop-up-display/beavertm-pop-up-display-system/parts/',
            children: [],
          },
        ],
      },
      {
        id: 45,
        parent_id: 25,
        name: 'Pop-Up Banner Stand',
        is_visible: true,
        url: '/backdrop-stands-pop-up-display/pop-up-banner-stand/',
        children: [],
      },
    ],
  },
  {
    id: 26,
    parent_id: 0,
    name: 'Banner Stands',
    is_visible: true,
    url: '/banner-stands/',
    description:
      'Banner stand incorporate basic design features, functionality and reliability. All banner stand includes a carry bag.',
    main_image: {
      src: '/categories/Banner Stand.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/03-Banner-Stands-copy.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/03-Banner-Stands-copy.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 46,
        parent_id: 26,
        name: 'X-Banner Stand',
        is_visible: true,
        url: '/banner-stands/x-banner-stand/',
        children: [],
      },
      {
        id: 47,
        parent_id: 26,
        name: 'Retractable Banner Stand',
        is_visible: true,
        url: '/banner-stands/retractable-banner-stand/',
        children: [],
      },
      {
        id: 48,
        parent_id: 26,
        name: 'Floor Standing Banner Stand',
        is_visible: true,
        url: '/banner-stands/floor-standing-banner-stand/',
        children: [],
      },
    ],
  },
  {
    id: 27,
    parent_id: 0,
    name: 'Brochure & Newspaper Holders',
    is_visible: true,
    url: '/brochure-newspaper-holders/',
    description:
      'Popular brochure and newspaper holder are perfect fit for selling and displaying literature, magazines and newspapers for retails store, restaurant and supermarket.',
    main_image: {
      src: '/categories/Brochure _ Newspaper Holders.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/04-Brochure-&-Newspaper-Holders.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/04-Brochure-&-Newspaper-Holders.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 49,
        parent_id: 27,
        name: 'Brochure / Magazine Holder',
        is_visible: true,
        url: '/brochure-newspaper-holders/brochure-magazine-holder/',
        children: [],
      },
      {
        id: 50,
        parent_id: 27,
        name: 'Newspaper Holders',
        is_visible: true,
        url: '/brochure-newspaper-holders/newspaper-holders/',
        children: [],
      },
    ],
  },
  {
    id: 28,
    parent_id: 0,
    name: 'Crowd Control Systems',
    is_visible: true,
    url: '/crowd-control-systems/',
    description:
      'Crowd control stanchions are excellent line management system. Stanchions make line barrier and relied upon to direct the flow of crowds. ',
    main_image: {
      src: '/categories/Crowd Control System.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/05-Crowd-Control-Systems.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/05-Crowd-Control-Systems.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 51,
        parent_id: 28,
        name: '4-Way Stanchion with Retractable Belt',
        is_visible: true,
        url: '/crowd-control-systems/4-way-stanchion-with-retractable-belt/',
        children: [],
      },
      {
        id: 52,
        parent_id: 28,
        name: 'Stanchion Sign Holder',
        is_visible: true,
        url: '/crowd-control-systems/stanchion-sign-holder/',
        children: [],
      },
      {
        id: 53,
        parent_id: 28,
        name: 'Sphere Post Stanchion & Rope',
        is_visible: true,
        url: '/crowd-control-systems/sphere-post-stanchion-rope/',
        children: [],
      },
    ],
  },
  {
    id: 29,
    parent_id: 0,
    name: 'Flags',
    is_visible: true,
    url: '/flags/',
    description:
      'Wide range selection of flag kit and accessories such as teardrop, feather, block flagpoles and various bases. It can easily place outdoor and indoor for attracting attention to special offers and sales. ',
    main_image: {
      src: '/categories/Flags.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/06-Flags.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/06-Flags.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 54,
        parent_id: 29,
        name: 'Tear Drop Flag Pole',
        is_visible: true,
        url: '/flags/tear-drop-flag-pole/',
        children: [],
      },
      {
        id: 55,
        parent_id: 29,
        name: 'Feather Flag Pole',
        is_visible: true,
        url: '/flags/feather-flag-pole/',
        children: [],
      },
      {
        id: 56,
        parent_id: 29,
        name: 'Block Flag Pole',
        is_visible: true,
        url: '/flags/block-flag-pole/',
        children: [],
      },
      {
        id: 57,
        parent_id: 29,
        name: 'Flag Parts',
        is_visible: true,
        url: '/flags/flag-parts/',
        children: [],
      },
    ],
  },
  {
    id: 30,
    parent_id: 0,
    name: 'Floor Sign Holder',
    is_visible: true,
    url: '/floor-sign-holder/',
    description:
      'Floor Sign Holders are available in several sizes and perfect for any retail setting, such as department store, banks, restaurants and etc. Excellent business marketing tools for advertising in a professional manner.',
    main_image: {
      src: '/categories/Floor Sign Holder.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/07-Floor-Sign-Holder.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/07-Floor-Sign-Holder.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 58,
        parent_id: 30,
        name: 'Easel',
        is_visible: true,
        url: '/floor-sign-holder/easel/',
        children: [],
      },
      {
        id: 59,
        parent_id: 30,
        name: 'Large Scale Graphic Support',
        is_visible: true,
        url: '/floor-sign-holder/large-scale-graphic-support/',
        children: [],
      },
      {
        id: 60,
        parent_id: 30,
        name: 'Floor Sign Holder',
        is_visible: true,
        url: '/floor-sign-holder/floor-sign-holder/',
        children: [],
      },
      {
        id: 61,
        parent_id: 30,
        name: 'Sign Holder',
        is_visible: true,
        url: '/floor-sign-holder/sign-holder/',
        children: [],
      },
      {
        id: 62,
        parent_id: 30,
        name: 'Bulletin Sign holder',
        is_visible: true,
        url: '/floor-sign-holder/bulletin-sign-holder/',
        children: [],
      },
    ],
  },
  {
    id: 31,
    parent_id: 0,
    name: 'Metal A-Frame Sign Holders',
    is_visible: true,
    url: '/metal-a-frame-sign-holders/',
    description:
      'Sidewalk sign holders are one of the most cost effective and excellent marketing tools for outdoor and indoor advertising. Our own manufacturer provides high quality and versatile ways of durable products to meet the market demand.',
    main_image: {
      src: '/categories/Metal Aframe Sign Holder.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/08-Metal-A-Frame-Sign-Holders.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/08-Metal-A-Frame-Sign-Holders.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 63,
        parent_id: 31,
        name: 'Angled Metal A-Frames',
        is_visible: true,
        url: '/metal-a-frame-sign-holders/angled-metal-a-frames/',
        children: [],
      },
      {
        id: 64,
        parent_id: 31,
        name: 'Heavy Duty Metal A-Frame ',
        is_visible: true,
        url: '/metal-a-frame-sign-holders/heavy-duty-metal-a-frame/',
        children: [],
      },
      {
        id: 65,
        parent_id: 31,
        name: 'Chalkboard A-Frame',
        is_visible: true,
        url: '/metal-a-frame-sign-holders/chalkboard-a-frame/',
        children: [],
      },
      {
        id: 66,
        parent_id: 31,
        name: 'Aluminum Snap A-Frame',
        is_visible: true,
        url: '/metal-a-frame-sign-holders/aluminum-snap-a-frame/',
        children: [],
      },
    ],
  },
  {
    id: 32,
    parent_id: 0,
    name: 'Metal Lawn Sign Holders',
    is_visible: true,
    url: '/metal-lawn-sign-holders/',
    description:
      'Metal lawn sign holder is the most common product to advertise for real estate and retail market. It is the best way to give attention to your potential customers.',
    main_image: {
      src: '/categories/Metal-Lawn-Sign-Holder.png',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/09-Metal-Lawn-Sign-Holders.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/09-Metal-Lawn-Sign-Holders.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 67,
        parent_id: 32,
        name: 'Metal Lawn Post',
        is_visible: true,
        url: '/metal-lawn-sign-holders/metal-lawn-post/',
        children: [],
      },
      {
        id: 68,
        parent_id: 32,
        name: 'Metal Lawn Stake',
        is_visible: true,
        url: '/metal-lawn-sign-holders/metal-lawn-stake/',
        children: [],
      },
    ],
  },
  {
    id: 33,
    parent_id: 0,
    name: 'PVC A-Boards',
    is_visible: true,
    url: '/pvc-a-boards/',
    description:
      'Our exclusive PVC A-Board is made of durable PVC Board with removable feature. White powder coated metal wrap provides extra protection of the PVC Board. ',
    main_image: {
      src: '/categories/PVC A-Board.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/10-PVC-A-Boards.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/10-PVC-A-Boards.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 69,
        parent_id: 33,
        name: 'Metal Edge PVC A-Board ',
        is_visible: true,
        url: '/pvc-a-boards/metal-edge-pvc-a-board/',
        children: [],
      },
      {
        id: 70,
        parent_id: 33,
        name: 'Plastic Hinge Handle ',
        is_visible: true,
        url: '/pvc-a-boards/plastic-hinge-handle/',
        children: [],
      },
    ],
  },
  {
    id: 34,
    parent_id: 0,
    name: 'Sign Brackets & Banner Hangers',
    is_visible: true,
    url: '/sign-brackets-banner-hangers',
    description: 'Sign Brackets & Banner Hangers',
    main_image: {
      src: '/categories/Sign Brackets.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/11-Sign-Brackets-&-Banner-Hangers.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/11-Sign-Brackets-&-Banner-Hangers.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 71,
        parent_id: 34,
        name: 'Architectural Sign Brackets',
        is_visible: true,
        url: '/sign-brackets-banner-hangers/architectural-sign-brackets/',
        children: [],
      },
    ],
  },
  {
    id: 35,
    parent_id: 0,
    name: 'Frame Sign Holders',
    is_visible: true,
    url: '/frame-sign-holders/',
    description:
      'Wall mounted frame sign holders include snap frame and magnetic frame, which feature poster and graphics in a quick and effortless change.',
    main_image: {
      src: '/categories/Frame Sign Holders.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/12-Frame-Sign-Holders.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/12-Frame-Sign-Holders.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 72,
        parent_id: 35,
        name: 'Snap Frame Sign Holder',
        is_visible: true,
        url: '/frame-sign-holders/snap-frame-sign-holder/',
        children: [
          {
            id: 90,
            parent_id: 72,
            name: 'Mitered Corner Snap Frame',
            is_visible: true,
            url:
              '/frame-sign-holders/snap-frame-sign-holder/mitered-corner-snap-frame/',
            children: [],
          },
          {
            id: 91,
            parent_id: 72,
            name: 'Round Corner Snap Frame',
            is_visible: true,
            url:
              '/frame-sign-holders/snap-frame-sign-holder/round-corner-snap-frame/',
            children: [],
          },
        ],
      },
      {
        id: 73,
        parent_id: 35,
        name: 'Magnetic Sign holder',
        is_visible: true,
        url: '/frame-sign-holders/magnetic-sign-holder/',
        children: [],
      },
    ],
  },
  {
    id: 36,
    parent_id: 0,
    name: 'Standoffs & Cable Wire System',
    is_visible: true,
    url: '/standoffs-cable-wire-system/',
    description:
      'Each standoff consists of a cap and base which comes in different finishes and lengths. ',
    main_image: {
      src: '/categories/Standoffs _ Cable wire system.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/13-Standoffs-&-Cable-wire-System.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/13-Standoffs-&-Cable-wire-System.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 74,
        parent_id: 36,
        name: 'Standoffs',
        is_visible: true,
        url: '/standoffs-cable-wire-system/standoffs/',
        children: [
          {
            id: 92,
            parent_id: 74,
            name: 'Aluminum Finish',
            is_visible: true,
            url: '/standoffs-cable-wire-system/standoffs/aluminum-finish/',
            children: [],
          },
          {
            id: 93,
            parent_id: 74,
            name: 'Chrome Finish',
            is_visible: true,
            url: '/standoffs-cable-wire-system/standoffs/chrome-finish/',
            children: [],
          },
          {
            id: 94,
            parent_id: 74,
            name: 'Stainless Steel Finish',
            is_visible: true,
            url:
              '/standoffs-cable-wire-system/standoffs/stainless-steel-finish/',
            children: [],
          },
          {
            id: 95,
            parent_id: 74,
            name: 'Foil Finish',
            is_visible: true,
            url: '/standoffs-cable-wire-system/standoffs/foil-finish/',
            children: [],
          },
          {
            id: 96,
            parent_id: 74,
            name: 'Edge Grips',
            is_visible: true,
            url: '/standoffs-cable-wire-system/standoffs/edge-grips/',
            children: [],
          },
          {
            id: 97,
            parent_id: 74,
            name: 'Caps',
            is_visible: true,
            url: '/standoffs-cable-wire-system/standoffs/caps/',
            children: [],
          },
        ],
      },
      {
        id: 75,
        parent_id: 36,
        name: 'Cable–Wire System',
        is_visible: true,
        url: '/standoffs-cable-wire-system/cable-wire-system/',
        images: [
          {
            src: '/menu-categories/',
            height: 1,
            width: 1,
          },
        ],
        children: [
          {
            id: 98,
            parent_id: 75,
            name: 'Wall Mount Bracket',
            is_visible: true,
            url:
              '/standoffs-cable-wire-system/cable-wire-system/wall-mount-bracket/',
            children: [],
          },
          {
            id: 99,
            parent_id: 75,
            name: 'Clamps',
            is_visible: true,
            url: '/standoffs-cable-wire-system/cable-wire-system/clamps/',
            children: [],
          },
          {
            id: 100,
            parent_id: 75,
            name: 'Connector Units',
            is_visible: true,
            url:
              '/standoffs-cable-wire-system/cable-wire-system/connector-units/',
            children: [],
          },
        ],
      },
      {
        id: 76,
        parent_id: 36,
        name: 'Rod Display System',
        is_visible: true,
        url: '/standoffs-cable-wire-system/rod-display-system/',
        children: [],
      },
    ],
  },
  {
    id: 109,
    parent_id: 0,
    name: 'Way–Finding Signs',
    is_visible: true,
    url: '/way-finding-signs/',
    description:
      'Way Finding Sign and Information Sign are very noticeable placard that inform people of the purpose of an object.',
    main_image: {
      src: '/categories/Wayfinding Signs.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/14-Way–Finding-Signs.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/14-Way–Finding-Signs.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [
      {
        id: 110,
        parent_id: 109,
        name: 'Washroom Sign',
        is_visible: true,
        url: '/way-finding-signs/washroom-sign/',
        children: [],
      },
      {
        id: 111,
        parent_id: 109,
        name: '“PUSH” & “PULL” Sign',
        is_visible: true,
        url: '/way-finding-signs/push-pull-sign/',
        children: [],
      },
      {
        id: 112,
        parent_id: 109,
        name: '“NO SMOKING” Sign',
        is_visible: true,
        url: '/way-finding-signs/no-smoking-sign/',
        children: [],
      },
      {
        id: 113,
        parent_id: 109,
        name: 'Aluminum Sign Panel',
        is_visible: true,
        url: '/way-finding-signs/aluminum-sign-panel/',
        children: [],
      },
    ],
  },
  {
    id: 38,
    parent_id: 0,
    name: 'Wind Resistant Sign Holders',
    is_visible: true,
    url: '/wind-resistant-sign-holders/',
    description:
      'Wind Resistant Sign Holder with flexible spring legs will give you peace of mind that your outdoor advertising is safe. Upright snap frame with rounded corner is completely enclosed for moisture resistant.',
    main_image: {
      src: '/categories/Wind Resistant.jpg',
      width: 500,
      height: 500,
    },
    banner_image: {
      src: '/banner-categories/15-Wind-Resistant-Sign-Holders.png',
      width: 2,
      height: 1,
    },
    images: [
      {
        src: '/menu-categories/15-Wind-Resistant-Sign-Holders.jpg',
        height: 1,
        width: 1,
      },
    ],
    children: [],
  },
]
