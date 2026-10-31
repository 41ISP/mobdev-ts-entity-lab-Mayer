import { API_URL } from "../api";
import { TYPES_LABELS, type IPlanet } from "../types";

interface IPlanetCard extends IPlanet {}

export function PlanetCard(
{
   name,
   description,
   distanceFromSun,
   diameter,
   mass,
   type,
   discoveredDate,
   features,
   image

}: IPlanetCard) {
    
    return (
        <article className="card">
            <div className="card__cover">
                {image ? (
                    <img
                        src={API_URL + image.url}
                        alt={image.alternativeText}
                    />
                ) : (
                    <span>{name[0]}</span>
                )}
                {/* {rating && <b className="card__rating">{rating}</b>} */}

            </div>

            <div className="card__body">
                 <h3>{name}</h3>
                {
                    type && 
                    <p className="card__meta">{TYPES_LABELS[type]}</p>
                }
                {discoveredDate && (
                    <p className="card__meta">
                        {new Date(discoveredDate).getFullYear()}
                    </p>
                )}

                {description && (
                    <p className="card__desc">
                        {description}
                    </p>
                )}
                {features && (
                    <p className="card__desc">
                        {features.join(" - ")}
                    </p>
                )}
                
            </div>

            <footer className="card__footer">
                {diameter && (
                    <strong>
                        {diameter} км
                    </strong>
                )}

                 {distanceFromSun && (
                    <strong>
                        {distanceFromSun} млн км
                    </strong>
                )}

                   {mass && (
                    <strong>
                        {mass} млн тонн
                    </strong>
                )}
                <button className="link-btn">Удалить</button>
            </footer>
        </article>
    )
}
