import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import { Link, useParams } from 'react-router-dom';
import 'date-fns/locale/pt-BR'

interface LessonProps {
    title: string;
    availableAt: Date;
    slug: string;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps){
    const { slug } = useParams<{ slug: string}>()

    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    });

    const isActiveLesson = slug === props.slug

    return(
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className={`${isActiveLesson ? "bg-green-500 text-white" : ""} rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500`}>
                <header className="flex items-center justify-between">
                    
                    { isLessonAvailable ? (
                        <span className={` ${isActiveLesson ? "text-white" : "text-blue-500 "} text-sm font-medium flex items-center gap-2`}>
                            <CheckCircle size={20} />
                            Conteúdo Liberado
                        </span>
                    ) : (
                        <span className={` ${isActiveLesson ? "text-white" : "text-orange-500 "} "text-sm  font-medium flex items-center gap-2`}>
                            <Lock size={20} />
                            Em Breve
                        </span>
                    )}

                    <span className={` ${isActiveLesson ? "border-white" : "border-green-500 "} text-xs rounded px-2 py-[0.125rem] text-white border border-green-500 font-bold`}>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>
                <strong className="text-gray-200 mt-5 block">
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}