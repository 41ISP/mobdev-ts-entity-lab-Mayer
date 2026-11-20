import { API_URL } from "../api";
import { TYPES_LABELS, type IPlanet } from "../types";

// 1. Убираем из пропсов лишнее, добавляем documentId и onDelete
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
   documentId, // Добавлено
   onDelete,   // Добавлено
}: IPlanetCard) {
    
    return (
        <article className="card">
            {/* Блок card__cover (правило 6.3) */}
            <div className="card__cover">
                {image ? (
                    <img
                        src={new URL(image.url, API_URL).href} // Надежное формирование URL
                        alt={image.alternativeText ?? name} // Запасной вариант (правило 6.3)
                    />
                ) : (
                    <span className="card__placeholder">{name.charAt(0)}</span>
                )}
                {/* Бейдж вынесен сюда, если понадобится (правило 6.3) */}
                {/* <b className="card__badge">{mass}</b> */}
            </div>

            {/* Блок card__body (правило 6.3) */}
            <div className="card__body">
                <h3>{name}</h3>
                
                {/* Enumeration через словарь (правило 6.2) */}
                {type && <p className="card__meta">{TYPES_LABELS[type]}</p>}

                {/* Дата: форматирование (правило 6.2) */}
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

                {/* Массив значений через map (правило 6.2) */}
                {features && features.length > 0 && (
                    <div className="card__chips">
                        {features.map((feature) => (
                            <span key={feature} className="chip">{feature}</span>
                        ))}
                    </div>
                )}
            </div>

            {/* Блок card__footer (правило 6.3) */}
            <footer className="card__footer">
                {/* Целые числа с единицами (правило 6.2). 
                    Проверка на 0 не нужна, так как 0 — валидный диаметр, 
                    а && в JSX не отрисует 0. Используем ?? для undefined/null */}
                {diameter !== undefined && diameter !== null && (
                    <strong>{diameter} км</strong>
                )}

                {distanceFromSun !== undefined && distanceFromSun !== null && (
                    <strong>{distanceFromSun} млн км</strong>
                )}

                {mass !== undefined && mass !== null && (
                    <strong>{mass} млн тонн</strong>
                )}
                
                {/* Кнопка вызывает onDelete с documentId (правило 6.3) */}
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