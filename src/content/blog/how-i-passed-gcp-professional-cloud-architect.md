---
title: How I passed the GCP Professional Cloud Architect exam
date: 2022-01-05
---

Late last year after I started working at Simple Machines, some of my colleagues and I were given time to study for and complete the GCP Professional Cloud Architect exam. I booked and took the exam last week and I want to share my exam experience and the study pathway I used to pass the certification exam.

It's worth noting that I didn't come into this exam as a complete cloud newbie; if I was, I imagine I'd have taken an associate level certification instead. At Domain, I worked with various AWS core and big data/data science services like EMR and Sagemaker, and I also have experience with a few other AWS services from some personal projects I've done.

## Exam day experience

I chose the remote proctored exam rather than the exam centre as I'm used to online proctored exams from finishing university during COVID, and I didn't think travelling to the city was wise with the case numbers in Sydney at the moment.

I took the exam on my personal Windows laptop and for the most part, the proctoring experience was fine. It only took roughly 10 minutes to get connected to a proctor, who then checked my ID and got me to show everything in my room (walls, ceiling, floor, desk and under the desk), including using a mirror to see behind your screen. The proctor communicates with you via chat and I wasn't sure if they could hear me. My one complaint would be that the proctoring/exam software seemed very fragile and I was worried that clicking the wrong thing would break something.

## Preparation

**1. Udemy**

Based on my coworkers' recommendations, I started with the [Google Cloud Professional Cloud Architect (New '21)](https://www.udemy.com/course/gcp-architect-am/) course on Udemy by Ashutosh Mishra. The course covers most of the GCP products from an architectural lense and contains both video lectures and lab guides that I was able to do with the $300 free trial on GCP.

I found the course did not go into enough detail for some products, and some of the video content was long and became a bit tedious to watch after a while, but overall I thought it served as a good primary resource. I did the practice exam from this course and scored 80%, which I thought was good for my first practice exam. I also watched the one hour refresher video on the morning before my exam.

**2. Case study summaries**

It's important to be familiar with the case studies and possible solutions before the exam so you're not spending valuable exam time reading

From what I gathered reading online sources, the case studies in the exam were updated back in May 2021. This means that some of the case study content online is outdated (for example, anything that mentions Dress4Win is old). A coworker recommended a series of case study summary videos from [Sun, Sea & You](https://www.youtube.com/user/sunseeandyou) that cover the updated case studies, which I think would be sufficient for preparation.

The GCP course on Udemy that I mentioned above also has proposed architectural solutions to the updated case studies that I watched, but it's a paid resource and I think the videos from Sun, Sea & You cover the main parts of each case study well enough.

## Strategy and tips

During the exam, you're able to mark questions for review and come back to them before you submit. I used this feature to get through the easier questions where I was more confident of my answer and then came back to the harder ones.

My case study questions didn't require too much contextual understanding and a coworker said the same thing, so don't focus too much on trying to memorise the exact proposed solution for each case study and just try to remember them more at a high level.

A major component in the exam is knowing the differentiating factors between various GCP services: for example, custom containers for Cloud Run vs standard runtimes for Cloud Functions, or Cloud Spanner being horizontally scalable vs Cloud SQL not being so. Make sure you can differentiate between the various database and compute options if given a scenario with varying scalability or data type requirements.

Make sure you're familiar with GKE, Anthos, and networking. There were a few questions in the exam that covered niches in these topics that I wouldn't have been able to pick the right answer for if I hadn't gone into more detail on them. Some of the questions were more of a hands on/developer style as well. For example, I had a question on exact `gcloud` CLI syntax.

In many questions, I found you were easily able to use a process of elimination to get to the right answer. If you eliminate answers that don't seem to make sense with the services they mention, you can sensibly pick between the remaining options and get the right answer.

Make sure you read the exact wording of the questions. I noticed I'd selected the wrong answer for a question where I'd missed a detail in the question about zonal vs regional replication. If you get time, do at least one review of all your answers before you submit and make sure you haven't missed any details or confused any similar services.
