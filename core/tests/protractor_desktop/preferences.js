// Copyright 2019 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview End-to-end tests for user preferences.
 */
var PreferencesPage = require('../protractor_utils/PreferencesPage.js');
var general = require('../protractor_utils/general.js');
var users = require('../protractor_utils/users.js');

describe('Preferences', function() {
  var preferencesPage = null;

  beforeEach(function() {
    preferencesPage = new PreferencesPage.PreferencesPage();
  });

  it('should change editor role email checkbox value', function() {
    users.createUser('alice@preferences.com', 'alicePreferences');
    users.login('alice@preferences.com');
    preferencesPage.get();
    expect(preferencesPage.isEditorRoleEmailsCheckboxSelected()).toBe(true);
    preferencesPage.toggleEditorRoleEmailsCheckbox();
    expect(preferencesPage.isEditorRoleEmailsCheckboxSelected()).toBe(false);
    browser.refresh();
    expect(preferencesPage.isEditorRoleEmailsCheckboxSelected()).toBe(false);
  });

  it('should change feedback message email checkbox value', function() {
    users.createUser('bob@preferences.com', 'bobPreferences');
    users.login('bob@preferences.com');
    preferencesPage.get();
    expect(preferencesPage.isFeedbackEmailsCheckboxSelected()).toBe(true);
    preferencesPage.toggleFeedbackEmailsCheckbox();
    expect(preferencesPage.isFeedbackEmailsCheckboxSelected()).toBe(false);
    browser.refresh();
    expect(preferencesPage.isFeedbackEmailsCheckboxSelected()).toBe(false);
  });

  it('should change prefered audio language', function() {
    users.createUser('paul@preferences.com', 'paulPreferences');
    users.login('paul@preferences.com');
    preferencesPage.get();
    expect(preferencesPage.preferredAudioLanguageSelector).toBeUndefined();
    preferencesPage.selectPreferredAudioLanguage('Hindi');
    preferencesPage.expectPreferredAudioLanguageToBe('Hindi');
    browser.refresh();
    preferencesPage.expectPreferredAudioLanguageToBe('Hindi');
    preferencesPage.selectPreferredAudioLanguage('Arabic');
    preferencesPage.expectPreferredAudioLanguageToBe('Arabic');
    browser.refresh();
    preferencesPage.expectPreferredAudioLanguageToBe('Arabic');
  });

  it('should change prefered site language', function() {
    users.createUser('paul@preferences.com', 'paulPreferences');
    users.login('paul@preferences.com');
    preferencesPage.get();
    expect(preferencesPage.systemLanguageSelector).toBeUndefined();
    preferencesPage.selectSystemLanguage('Español');
    preferencesPage.expectPreferredSiteLanguageToBe('Español');
    browser.refresh();
    preferencesPage.expectPreferredSiteLanguageToBe('Español');
    preferencesPage.selectSystemLanguage('English');
    preferencesPage.expectPreferredSiteLanguageToBe('English');
    browser.refresh();
    preferencesPage.expectPreferredSiteLanguageToBe('English');
  });
  
 it('should change prefered site language',function(){
    users.createUser('paul@preferences.com', 'paulPreferences');
    users.login('paul@preferences.com');
    preferencesPage.get();
    
  });

  afterEach(function() {
    general.checkForConsoleErrors([]);
    users.logout();
  });
});
