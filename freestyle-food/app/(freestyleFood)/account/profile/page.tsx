"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const fetchProfile = () => {
    
    if (!currentUser) return redirect("/account/login");
    setProfile(currentUser);
  };
  const signout = async () => {
     await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/account/login");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl id="wd-username" className="mb-2"
            defaultValue={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <FormControl id="wd-password" className="mb-2"
            defaultValue={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <FormControl id="wd-email" className="mb-2"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
