import { API_URL } from "../api";
import { TYPES_LABELS, type IPlanet } from "../types";

export interface IPlanetCard extends Omit<IPlanet, "createdAt" | "updatedAt" | "publishedAt"> {
    onDelete: (id: string) => void;
}

export function PlanetCard({
   name,
   description,
   distanceFromSun,
   diameter,
   mass,
   type,
   discoveredDate,
   features,
   image,
   documentId, 
   onDelete,   
}: IPlanetCard) {
    
    return (
        <article className="card">
        
            <div className="card__cover">
                {image ? (
                    <img
                        src={new URL(image.url, API_URL).href} 
                        alt={image.alternativeText ?? name} 
                    />
                ) : (
                    <span className="card__placeholder">{name.charAt(0)}</span>
                )}


            </div>

        
            <div className="card__body">
                <h3>{name}</h3>
                
         
                {type && <p className="card__meta">{TYPES_LABELS[type]}</p>}

      
                {discoveredDate && (
                    <p className="card__meta">
                        {new Date(discoveredDate).toLocaleDateString("ru-RU")}
                    </p>
                )}

                {/* Длинный текст (правило 6.2) */}
                {description && (
                    <p className="card__desc">
                        {description}
                    </p>
                )}

   
                {features && features.length > 0 && (
                    <div className="card__chips">
                        {features.map((feature) => (
                            <span key={feature} className="chip">{feature}</span>
                        ))}
                    </div>
                )}
            </div>

            <footer className="card__footer">
                {diameter !== undefined && diameter !== null && (
                    <strong>{diameter} км</strong>
                )}

                {distanceFromSun !== undefined && distanceFromSun !== null && (
                    <strong>{distanceFromSun} млн км</strong>
                )}

                {mass !== undefined && mass !== null && (
                    <strong>{mass} млн тонн</strong>
                )}
                
             
                <button 
                    className="link-btn" 
                    onClick={() => onDelete(documentId)}
                >
                    Удалить
                </button>
            </footer>
        </article>
    )
}