"use client";

export const getLocalStorageUser = () => {
    const users = JSON.parse(localStorage?.getItem("user-storage") || "")
    if (users) {
        return users?.state?.user
    }
    return null
}