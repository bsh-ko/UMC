export type Lp = {
  id: string;
  title: string;
  singer: string;
  price: string; // 제공된 constants/cartItems.ts 파일이 string이기 때문에 string으로 진행
  img: string;
  amount: number;
};

export type CartItems = Lp[];
