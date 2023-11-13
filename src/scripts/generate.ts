import animals from "./animals";

export default function getRandomAnimal() {
    return animals[Math.floor(Math.random() * animals.length)];
}
