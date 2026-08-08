import housingImg from "../assets/img/housing.png";


function foot() {
  return (
    <div className="mt-4 p-2 flex flex-col items-center gap-2 max-lg:items-center max-lg:px-3 max-lg:justify-center">
        <ul className="flex flex-wrap gap-2 text-xs max-lg:justify-center">
          <li>
            <span className="border-b border-black">Privacy Statement</span>
            <span className="mx-1">|</span>
          </li>
          <li>
            <span className="border-b border-black">Privacy Notice for California Residents</span>
          </li>
        </ul>
        <div className="w-150 text-center flex flex-col gap-4 text-xs pb-5 max-md:w-full max-md:items-center">
          <div>
            <img
              src={housingImg}
              alt="housingImg"
              className="w-44 h-auto mx-auto"
            />
          </div>
          <p>
            © 2025 Powered by BM Technologies, Inc., a wholly owned subsidiary
            of First Carolina Bank, Member FDIC and Equal Housing Lender. All
            Rights Reserved.
          </p>
          <p>
            BankMobile banking products and banking services are provided by
            First Carolina Bank, Member FDIC & Equal Housing Lender. The
            BankMobile Debit Mastercard® card is issued and administered by
            First Carolina Bank pursuant to license from Mastercard
            International Incorporated. Mastercard and the Mastercard brand mark
            are registered trademarks of Mastercard International Incorporated.
            All other names and logos are owned by their respective owners.
          </p>
          <p>
            BM Technologies, Inc., 171 North Winstead Avenue, Rocky Mount, NC
            27804
          </p>
        </div>
      </div>
  )
}

export default foot