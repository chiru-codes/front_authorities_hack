type CardProps = {
    number: number;
    title: string;
    description: string;
};

function Card({ number, title, description }: CardProps) {
    return (
        <div
            className="
                bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center
                transform transition duration-300 hover:scale-105
            "
        >
            <div className="w-12 h-12 flex items-center justify-center bg-sky-300 text-white rounded-full mb-4 text-xl font-bold">
                {number}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default Card;
