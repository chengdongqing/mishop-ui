declare interface Product {
  pictureUrl: string;
  label: string;
  price?: string;
}

declare interface ProductCategory {
  label: string;
  children?: Product[];
  href?: string;
}
