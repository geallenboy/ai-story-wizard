
export const MenuList = [
    {
        name: "首页",
        path: "/",
    },
    {
        name: "创作故事",
        path: "/create-story",
    },
    {
        name: "探索故事",
        path: "/explore",
    },
    {
        name: "关于我",
        path: "/about-me",
    },
];

export const priceOptions = [
    {
        id: 1,
        price: 1.99,
        credits: 10,
    },
    {
        id: 2,
        price: 2.99,
        credits: 30,
    },
    {
        id: 3,
        price: 5.99,
        credits: 75,
    },
    {
        id: 4,
        price: 9.99,
        credits: 150,
    },
];
export const createStoryImageStyleOptionList = [
    {
        label: "3D 卡通",
        imageUrl: "/3D.png",
        isFree: true,
    },
    {
        label: "剪纸",
        imageUrl: "/paperCut.png",
        isFree: true,
    },
    {
        label: "水彩",
        imageUrl: "/watercolor.png",
        isFree: true,
    },
    {
        label: "像素风格",
        imageUrl: "/pixel.png",
        isFree: true,
    },
];
export const createStoryAgeGroupOptionList = [
    {
        label: "0-2 岁",
        imageUrl: "/02Years.png",
        isFree: true,
    },
    {
        label: "3-5 岁",
        imageUrl: "/35Years.png",
        isFree: true,
    },
    {
        label: "5-8 岁",
        imageUrl: "/58Years.png",
        isFree: true,
    },
];

export const createStoryStoryTypeOptionList = [
    {
        label: "故事书",
        imageUrl: "/story.png",
        isFree: true,
    },
    {
        label: "床上故事",
        imageUrl: "/bedstory.png",
        isFree: true,
    },
    {
        label: "教育",
        imageUrl: "/educational.png",
        isFree: true,
    },
];
interface createStoryPromptType {
    ageGroup: string,
    storyType: string,
    imageStyle: string,
    storySubject: string
}




