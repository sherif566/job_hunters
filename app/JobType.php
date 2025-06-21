<?php

namespace App;

enum JobType: string
{
    case FullTime = 'full-time';
    case PartTime = 'part-time';
    case FreeLance = 'freelance';
    case Internship = 'internship';
}
