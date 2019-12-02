// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Utility service for language operations.
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { Injectable } from '@angular/core';

import { AudioLanguageObjectFactory } from
  'domain/utilities/AudioLanguageObjectFactory';
import { AutogeneratedAudioLanguageObjectFactory } from
  'domain/utilities/AutogeneratedAudioLanguageObjectFactory';
import { BrowserCheckerService } from
  'domain/utilities/browser-checker.service';

const CONSTANTS = require('constants.ts');

@Injectable({
  providedIn: 'root'
})
export class LanguageUtilService {
  supportedAudioLanguageList = CONSTANTS.SUPPORTED_AUDIO_LANGUAGES;
  autogeneratedAudioLanguageList = (
      CONSTANTS.AUTOGENERATED_AUDIO_LANGUAGES);
  constructor(
    private audioLanguageObject: AudioLanguageObjectFactory,
    private autogeneratedAudioLanguageObject:
    AutogeneratedAudioLanguageObjectFactory,
    private browserChecker: BrowserCheckerService) {}
  // TODO(#7165): Replace any with correct type.
  getSupportedAudioLanguages(): any {
    var supportedAudioLanguages = {};
    this.supportedAudioLanguageList.forEach((audioLanguageDict) => {
      supportedAudioLanguages[audioLanguageDict.id] =
        this.audioLanguageObject.createFromDict(audioLanguageDict);
    });
    return supportedAudioLanguages;
  }

  getAllAudioLanguageCodes(): Array<string> {
    var allAudioLanguageCodes = (
      this.supportedAudioLanguageList.map(function(audioLanguage) {
        return audioLanguage.id;
      }));
    return allAudioLanguageCodes;
  }
  // TODO(#7165): Replace any with correct type.
  getAutogeneratedAudioLanguages(type: string): any {
    var autogeneratedAudioLanguagesByType = {};
    this.autogeneratedAudioLanguageList.forEach(
      (autogeneratedAudioLanguageDict) => {
        var autogeneratedAudioLanguage =
          this.autogeneratedAudioLanguageObject.createFromDict(
            autogeneratedAudioLanguageDict);

        if (type === 'exp-lang-code') {
          autogeneratedAudioLanguagesByType[
            autogeneratedAudioLanguage.explorationLanguage] =
              autogeneratedAudioLanguage;
        } else if (type === 'autogen-lang-code') {
          autogeneratedAudioLanguagesByType[
            autogeneratedAudioLanguage.id] =
              autogeneratedAudioLanguage;
        } else {
          throw new Error('Invalid type: ' + type);
        }
      }
    );
    return autogeneratedAudioLanguagesByType;
  }

  getShortLanguageDescription(fullLanguageDescription: string): string {
    var ind = fullLanguageDescription.indexOf(' (');
    if (ind === -1) {
      return fullLanguageDescription;
    } else {
      return fullLanguageDescription.substring(0, ind);
    }
  }

  // TODO(#7165): Replace any with correct type.
  getLanguageIdsAndTexts(): any {
    var languageIdsAndTexts = CONSTANTS.SUPPORTED_CONTENT_LANGUAGES.map(
      (languageItem) => {
        return {
          id: languageItem.code,
          text: this.getShortLanguageDescription(languageItem.description)
        };
      });
    return languageIdsAndTexts;
  }
  getAudioLanguagesCount(): number {
    return this.getAllAudioLanguageCodes().length;
  }
  getAllVoiceoverLanguageCodes(): any {
    return this.getAllAudioLanguageCodes();
  }
  getAudioLanguageDescription(audioLanguageCode: string): string {
    return this.getSupportedAudioLanguages()[audioLanguageCode].description;
  }
  // Given a list of audio language codes, returns the complement list, i.e.
  // the list of audio language codes not in the input list.
  getComplementAudioLanguageCodes(
      audioLanguageCodes: Array<string>): Array<string> {
    return this.getAllAudioLanguageCodes().filter(function(languageCode) {
      return audioLanguageCodes.indexOf(languageCode) === -1;
    });
  }
  getLanguageCodesRelatedToAudioLanguageCode(
      audioLanguageCode: string): Array<string> {
    return (
      this.getSupportedAudioLanguages()[audioLanguageCode].relatedLanguages);
  }
  supportsAutogeneratedAudio(explorationLanguageCode: string): boolean {
    return (
      this.browserChecker.supportsSpeechSynthesis() &&
      this.getAutogeneratedAudioLanguages('exp-lang-code')
        .hasOwnProperty(explorationLanguageCode));
  }
  isAutogeneratedAudioLanguage(audioLanguageCode: string): boolean {
    return this.getAutogeneratedAudioLanguages('autogen-lang-code')
      .hasOwnProperty(audioLanguageCode);
  }
  getAutogeneratedAudioLanguage(explorationLanguageCode: string): string {
    return this.getAutogeneratedAudioLanguages('exp-lang-code')[
      explorationLanguageCode];
  }
}

angular.module('oppia').factory(
  'LanguageUtilService', downgradeInjectable(LanguageUtilService));
