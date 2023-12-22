'use client'
import {useState, useEffect} from'react'
import AddCourseSectionButton from '../section/buttons/add-course-section-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import EditSectionButton from '../section/buttons/edit-section-button';
import AddArticleButton from '../article/buttons/add-article-button';
import { Article, Course, Mentor, Profile, Section } from '@prisma/client';
import EditArticleButton from '../article/buttons/edit-article-button';

interface CourseSidebarProps {
  profile: Profile;
  mentor: Mentor;
  course: Course;
  sections: Section[];
  articles: Article[];
}

const CourseSidebar:React.FC<CourseSidebarProps> = ({
  profile,
  mentor,
  course,
  sections,
  articles,
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between ">
            <p className="w-full text-lg font-semibold">Curriculum</p>
            <div>
            {profile && mentor && mentor.id === profile.mentorId && (  <AddCourseSectionButton mentor={mentor} course={course} />)}
            </div>
            </div>
            
            {sections && sections.map((section) => (
                
                <Accordion type="single" collapsible key={section.id}>
                  <AccordionItem value={section.name}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full">
                    <p>{section.name}</p>
                    {profile && mentor && mentor.id === profile.mentorId && (
                    <div className="flex items-center gap-1">
                     <p className="text-muted-foreground">{section.estimatedTime } min</p>
                      <EditSectionButton mentor={mentor} section={section} />
                    </div>
                  )}
                    </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    <p className="text-muted-foreground">{section.description}</p>
                 <div className="flex flex-col justify-between w-full"> 
                  
                  <div className="flex w-full items-center justify-end">
                  {profile && mentor && mentor.id === profile.mentorId && (  <AddArticleButton mentor={mentor} section={section} />)}
                  </div>

                  <div>
                    {section.articleIds.map((articleId) => (
                      <div className="pl-5 flex flex-col py-2 " key={articleId}>
                        
                        <div className="flex justify-between w-full">
                          <p className="text-lg font-medium">{articles?.find((article) => article.id === articleId)?.name}</p>
                          
                          <div className="flex items-center gap-1">
                           <p className="text-muted-foreground"> {articles?.find((article) => article.id === articleId)?.estimatedTime} min</p>
                           {profile && mentor && articles && mentor.id === profile.mentorId && (     
                             <EditArticleButton mentor={mentor} article={articles?.find((article) => article.id === articleId)} />
                           )}
                          </div>
                          
                        </div>

                        <p className="text-muted-foreground">{articles?.find((article) => article.id === articleId)?.description}</p>
                      </div>
                    ))}
                  </div>
                 </div>
                  
                  </AccordionContent>
                 
                  </AccordionItem>
                  </Accordion>
                  
              ))}
          </div>
  );
}
export default CourseSidebar;