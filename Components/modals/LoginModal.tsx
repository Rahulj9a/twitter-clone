import useLoginModal from "@/Hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
     const loginModal = useLoginModal();

     const [email, setemail] = useState("");
     const [password, setpassword] = useState("");
     const [loading, setloading] = useState(false);

     const onSubmit = useCallback(async () => {
          try {
               setloading(true);
               //Todo:add login

               loginModal.onClose();
          } catch (error) {
               console.log(error);
          } finally {
               setloading(false);
          }
     }, [loginModal]);

     const bodyContent = (
          <div className="flex flex-col gap-4">
               <Input
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                    disabled={loading}
               />
               <Input
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    disabled={loading}
               />
          </div>
     );

     return (
          <div>
               <Modal
                    disabled={loading}
                    isOpen={loginModal.isOpen}
                    title="Login"
                    actionLabel="Sign in"
                    onClose={loginModal.onClose}
                    onSubmit={onSubmit}
                    body={bodyContent}
               />
          </div>
     );
};

export default LoginModal;
