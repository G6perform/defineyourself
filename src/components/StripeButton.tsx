"use client";

import { useEffect } from "react";

export default function StripeButton() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<stripe-buy-button
          buy-button-id="buy_btn_1SZjr2AxeR3ppDHMbkwNZNUq"
          publishable-key="pk_live_51RjxTkAxeR3ppDHMZhvGMnFAi5PnHqmFrSADOIZcqJxtcVkBLKrOFSnnxHNQCYVkX5eMNX4VfOxxOKFXPfxwgVWL00DcJmCWel"
        ></stripe-buy-button>`,
      }}
    />
  );
}
