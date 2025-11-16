import Card from "./Card";

function CardSection() {
    return (
        <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">

            <Card
                number={1}
                title="Reporta"
                description="Identifica un incidente en el campus y comunícalo al instante."
            />

            <Card
                number={2}
                title="Monitorea"
                description="Sigue el estado del reporte en tiempo real desde cualquier dispositivo."
            />

            <Card
                number={3}
                title="Resuelve"
                description="Colabora con el personal para solucionar rápidamente cualquier incidente."
            />

        </section>
    );
}

export default CardSection;
