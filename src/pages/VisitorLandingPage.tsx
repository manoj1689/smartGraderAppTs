import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//@ts-ignore
import CryptoUtil from "../components/Crypto/CryptoEngine";
//@ts-ignore
import VisitorLanding from "../components/Visitor/Visitor_landing";

const VisitorLandingPage: React.FC = () => {
  const SECRET_KEY = "ASHJKDBNMDUYRLDK"; // Ensure this is the same as used in FastAPI
  const cryptoUtil = new CryptoUtil(SECRET_KEY);

  // Extract the dynamic parameter (wildcard *) from the URL
  const { '*': wildcardParams } = useParams<{ '*': string }>();

  // State to store decrypted data
  const [decryptedData, setDecryptedData] = useState<string | null>(null);

  useEffect(() => {
    if (wildcardParams) {
      // Decrypt the data when the wildcard params are available
      const handleDecrypt = () => {
        try {
          const decrypted = cryptoUtil.decrypt(wildcardParams); // Decrypt the wildcard string
          console.log("Decrypted value:", decrypted);
          setDecryptedData(decrypted); // Set the decrypted data in the state
        } catch (error) {
          console.error("There was an error decrypting the message!", error);
        }
      };

      handleDecrypt(); // Call the decryption function when the component mounts
    }
  }, [wildcardParams]); // Run the effect when the wildcard parameters change

  return (
    <div className="visitor-landing-page">
      {/* Only render VisitorLanding if decryptedData is available */}
      {decryptedData ? (
        <VisitorLanding decryptedData={decryptedData} /> // Pass the decrypted data as prop
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VisitorLandingPage;




