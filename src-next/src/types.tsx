import { Dispatch, SetStateAction } from "react";

export interface LandingPagePropsType {
    setLandingShow: Dispatch<SetStateAction<boolean>>

}


export interface VideoAttributePropsType {
    id: string,
    name: string,
    height: number,
    width: number,
    aspectRatio: string,
}