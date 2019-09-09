# Datalyzer

## Usage

The Datalyzer enables a user to explore, slice and dice Event and Metric
data in NRDB in a simple, fast and intuitive way. 

![screenshot](./screenshots/screenshot.png)

Note the Datalyzer is offered as a launcher (providing global visibility across
all accounts, metrics and events) and also in the Entity Explorer. In the latter
case, you can select a Service, Mobile App or Browser App and use the Datalyzer
to slice and dice relevant data specific to that entity:

![screenshot](./screenshots/screenshot-2.png)

## Open Source License

This project is distributed under the [Apache 2 license](blob/master/LICENSE).

## What do you need to make this work?

A New Relic account with some data in it.

**Note**: When you select _Metrics_ (as opposed to _Events_), Datalyzer
allows you to explore dimensional metric data that was introduced by New Relic
in September, 2019, and is supported by products such as the New Relic
[Prometheus OpenMetrics Integration](#). Traditional (nondimensional) metrics
collected by older New Relic products are not currently supported.

## Getting started

Clone this repository and run the following scripts:

```bash
git clone https://github.com/newrelic/nr1-datalyzer.git
cd nr1-datalyzer
nr1 nerdpack:uuid -gf
npm install
npm start
```

Visit [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local), navigate to the Nerdpack, and :sparkles:

## Deploying this Nerdpack

Open a command prompt in the nerdpack's directory and run the following commands.

```bash
# this is to create a new uuid for the nerdpack so that you can deploy it to your account
nr1 nerdpack:uuid -g [--profile=your_profile_name]
# to see a list of APIkeys / profiles available in your development environment, run nr1 credentials:list
nr1 nerdpack:publish [--profile=your_profile_name]
nr1 nerdpack:deploy [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
nr1 nerdpack:subscribe [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
```

Visit [https://one.newrelic.com](https://one.newrelic.com), navigate to the Nerdpack, and :sparkles:

## Support

New Relic has open-sourced this project. This project is provided AS-IS WITHOUT WARRANTY OR SUPPORT, although you can report issues and contribute to the project here on GitHub.

_Please do not report issues with this software to New Relic Global Technical Support._

### Community

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorer's Hub. You can find this project's topic/threads here:

[https://discuss.newrelic.com/c/build-on-new-relic/nr1-datalyzer](https://discuss.newrelic.com/c/build-on-new-relic/nr1-datalyzer)
*(Note: URL subject to change before GA)*

### Issues / Enhancement Requests

Issues and enhancement requests can be submitted in the [Issues tab of this repository](../../issues). Please search for and review the existing open issues before submitting a new issue.

## Contributing

Contributions are welcome (and if you submit a Enhancement Request, expect to be invited to contribute it yourself :grin:). Please review our [Contributors Guide](CONTRIBUTING.md).

Keep in mind that when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. If you'd like to execute our corporate CLA, or if you have any questions, please drop us an email at opensource@newrelic.com.
