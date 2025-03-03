interface WeatherCardProps {
    city: string;
    temperature: number;
    onDelete: () => void;
  }
  
  const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, onDelete }) => {
    return (
      <div className="weather-card">
        <button className="close-btn" onClick={onDelete}>X</button>
        <h3>{city}</h3>
        <p>{temperature}°C</p>
      </div>
    );
  };
  
  export default WeatherCard;
  