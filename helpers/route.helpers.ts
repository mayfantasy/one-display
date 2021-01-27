import { INavItem } from 'types/nav.types'

export const pageRoutes = {
  // loginPage: {
  //   key: 'login-page',
  //   name: 'Login',
  //   url: '/login',
  // } as INavItem,
  // registerPage: {
  //   key: 'register-page',
  //   name: 'Register',
  //   url: '/register',
  // } as INavItem,
  accountInfoPage: {
    key: 'account-page',
    name: 'My Account',
    url: '/account/info',
  } as INavItem,
  accountOrdersPage: {
    key: 'orders-page',
    name: 'My Orders',
    url: '/account/orders',
  } as INavItem,
  homePage: {
    key: 'home-page',
    name: 'Home',
    url: '/',
  } as INavItem,
  aboutPage: {
    key: 'about',
    name: 'About Us',
    url: '/about-us',
  } as INavItem,
  categoryListPage: {
    key: 'categories',
    name: 'Categories',
    url: '/categories',
  } as INavItem,
  categoryPage: (categoryId: number) => {
    return {
      key: 'category',
      name: 'Category',
      url: `/category/${categoryId}`,
    } as INavItem
  },
  contactPage: {
    key: 'contact',
    name: 'Contact Us',
    url: '/contact',
  } as INavItem,
  cartPage: {
    key: 'cart',
    name: 'Cart',
    url: '/cart',
  } as INavItem,
  privacyPage: {
    key: 'privacy',
    name: 'Privacy Statement',
    url: '/privacy-statement',
  } as INavItem,
  termsOfUsePage: {
    key: 'terms-of-use',
    name: 'Terms of Use',
    url: '/terms-of-use',
  } as INavItem,
  shippingPolicyPage: {
    key: 'shipping-policy',
    name: 'Shipping Policy',
    url: '/shipping-policy',
  } as INavItem,
  returnAndRefundPage: {
    key: 'return-and-refund-policy',
    name: 'Return & Refund Policy',
    url: '/return-and-refund',
  } as INavItem,
  productSearchPage: {
    key: 'search',
    name: 'Search Products',
    url: '/products/search',
  },
  productDetailPage: (handle: string) =>
    ({
      key: 'product-detail-page',
      name: 'Product Detail',
      url: `/product/${handle}`,
      dynamicUrl: '/products/[collectionHandle]/[productHandle]',
    } as INavItem),
  productListPage: (handle: string) =>
    ({
      key: 'product-list-page',
      name: 'Product List',
      url: `/products/${handle}`,
      dynamicUrl: '/products/[collectionHandle]',
    } as INavItem),
}
