import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51PXaWjBbpC4dD3dTRcSrwqAWdgHHtAV8RO1v8W7fpbfY91FaqOKqbpdlwjJQAWtUSZu3hkczabVoksBOsBi0Xjur00ju2anpdH');
  }
  return stripePromise;
};

export default getStripe;
