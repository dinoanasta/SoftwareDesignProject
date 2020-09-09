# SoftwareDesignProject
# 2B||!2B

## About this project :)
This is a drag-and-drop graph creator interface for studying graph theory. It allows the student to visually create their answer to tutorial questions, and download them in a format that can be automatically marked/submitted for marking. There is a practice mode with a few pre-set markers, where you can check your answers without submitting them, and a testing/submission mode where you can only download your answer for submission.

For instructors, this means that you can set tutorial-type practical questions on graph theory, and still be able to automatically mark them. Our project currently supports downloading the answer files in JSON format, and converting this into a Java object format (see [Java](Java)).

## Installation:
The [GraphGenerator](GraphGenerator) folder can be deployed on a server for organisational use, anyone who can access a copy of these files can run it in a browser window (preferably Chrome) and use the full functionality of the project. It does not require an internet connection to use.

## Manuals
The student manual can be found [here](Manuals/StudentManual.pdf), and the lecturer manual can be found [here](Manuals/LecturerManual.pdf).


## Continuous Integration and Coverage for JavaScript Code
[![dinoanasta](https://circleci.com/gh/dinoanasta/SoftwareDesignProject.svg?style=svg)](https://app.circleci.com/pipelines/github/dinoanasta/SoftwareDesignProject)
[![Coverage Status](https://coveralls.io/repos/github/dinoanasta/SoftwareDesignProject/badge.svg?branch=master)](https://coveralls.io/github/dinoanasta/SoftwareDesignProject?branch=master)

## Continuous Integration and Coverage for Java Code
[![Build Status](https://travis-ci.org/dinoanasta/SoftwareDesignProject.svg?branch=master)](https://travis-ci.org/dinoanasta/SoftwareDesignProject)
[![codecov](https://codecov.io/gh/dinoanasta/SoftwareDesignProject/branch/master/graph/badge.svg)](https://codecov.io/gh/dinoanasta/SoftwareDesignProject)
