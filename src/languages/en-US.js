const { Language, util } = require('klasa');

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.language = {
			// Prompts
			MESSAGE_PROMPT_TIMEOUT: "The prompt has timed out.",
			MESSAGE_PROMPT_CANCELED: "Canceled command.",
			MULTIPLE_ITEMS_FOUND_PROMPT: (results) => `Multiple items found. Please choose one of the following, or type cancel.${results}`,
			ANSWER_CANCEL_PROMPT: "cancel",

			// Commands
			COMMAND_PING: "Ping?",
			COMMAND_PINGPONG: (latencyms, latencyapims) => `Latency: ${latencyms} \nAPI Latency: ${latencyapims}`,
			COMMAND_HELP_DESCRIPTION: "Display help for a command.",
			COMMAND_HELP_DM: "📥 | The list of commands you have access to has been sent to your DMs.",
			COMMAND_HELP_NODM: "❌ | You have DMs disabled, I couldn't send you the commands in DMs.",
			COMMAND_HELP_USAGE: (usage) => `Usage :: ${usage}`,
			COMMAND_HELP_EXTENDED_DESC: "**Extended Help:**",
			COMMAND_HELP_EXTENDED: "Extended Help ::",
			COMMAND_HELP_DESCRIPTION_DESC: "**Description:**",
			COMMAND_HELP_USAGE_DESC: "**Usage:**",
			COMMAND_HELP_ALIASES_DESC: "**Aliases:**",
			COMMAND_HELP_NO_ALIASES_DESC: "no aliases",
			COMMAND_HELP_CATEGORIES: (category) => `**${category} Commands**:\n`,
			COMMAND_HELP_CATEGORIES_TITLE: (category) => `${category} Commands`,
			COMMAND_TRANSLATE_EMBED_TITLE: "Translation project",
			COMMAND_TRANSLATE_EMBED_DESCRIPTION: "Our goal is to offer LenoxBot in many different languages. It allows anyone to change the bot's language to their native language. However, there are over 10 thousand words to translate and that's why we need your help. \nYou have the opportunity to help us to translate LenoxBot by joining the project linked below! \n\nThank you and have fun!",
			COMMAND_TRANSLATE_EMBEDFIELDTITLE: "Translation project link:",
			COMMAND_VOTE_EMBEDAUTHOR: "Voting:",
			COMMAND_VOTE_EMBEDDESCRIPTION: (link) => `You will receive between 100-1000 credits for the upvote on the weekdays. \nFrom Friday to Sunday you will receive between 200-2000 credits. \n\nLink: ${link}`,
			COMMAND_GITHUB_EMBEDTITLE: "LenoxBot's GitHub Repository:",
			COMMAND_GITHUB_EMBEDDESCRIPTION: "Our source code of LenoxBot (including the website) is available in our GitHub Repository. \n\nThe branch **master** is the branch which is currently online on LenoxBot. \nThe branch **testing** is the branch where we push all new updates and test it before realising them.",
			COMMAND_GITHUB_FIELDTITLELINK: "LenoxBot's GitHub Repository link:",
			COMMAND_GITHUB_FIELDTITLECONTRIBUTE: "How do you contribute?",
			COMMAND_GITHUB_FIELDDESCRIPTIONCONTRIBUTE: "We would be very happy to receive help from developers who are able to help us out to fix bugs or add new features. Currently we are only 2 developers who can work on LenoxBot. If you're interested in helping us out, you can read the following document: https://github.com/LenoxBot/LenoxBot/blob/testing/.github/CONTRIBUTING.md",
			COMMAND_EVAL_CHOOSE_ONE_OF_THE_OPTIONS_PROMPT: (_options) => `Choose one of the following options: ${_options.join(", ")}`,
			ANSWER_EVAL_UPLOAD_TO_SERVICE_PROMPT: ["file", "haste", "hastebin", "mystbin", "console", "log", "default", "none", "cancel"],
			COMMAND_EVAL_TIMEOUT: (seconds) => `TIMEOUT: Took longer than ${seconds} seconds.`,
			COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_CONSOLE: (time, type) => `Sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_FILE: (time, type) => `Sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_HASTEBIN: (time, url, type) => `Sent the result to hastebin: ${url}\n**Type**:${type}\n${time}\n`,
			COMMAND_EVAL_OUTPUT_MYSTBIN: (time, url, type) => `Sent the result to mystbin: ${url}\n**Type**:${type}\n${time}\n`,
			COMMAND_HEAPSNAPSHOT_CAPTURING: "Capturing HEAP Snapshot. This may take a while...",
			COMMAND_HEAPSNAPSHOT_CAPTURED_DONE: (path) => `Captured in \`${path}\`, check! Remember, do NOT share this with anybody, it may contain a lot of sensitive data.`,

			// Command Descriptions
			COMMAND_PING_DESCRIPTION: "Runs a connection test to Discord.",
			COMMAND_TRANSLATE_DESCRIPTION: "Gives you informations about our translation project",
			COMMAND_VOTE_DESCRIPTION: "All details about voting for LenoxBot",
			COMMAND_GITHUB_DESCRIPTION: "All details about our GitHub Repository of LenoxBot",
			COMMAND_EVAL_DESCRIPTION: "Evaluates arbitrary Javascript. Reserved for bot owner.",
			COMMAND_EVAL_EXTENDEDHELP: [
				"The eval command evaluates code as-in, any error thrown from it will be handled.",
				"It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.",
				"The --silent flag will make it output nothing.",
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				"The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.",
				"The --showHidden flag will enable the showHidden option in util.inspect.",
				"If the output is too large, it'll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.",
			].join("\n"),
			COMMAND_EXEC_DESCRIPTION: "Execute commands in the terminal, use with EXTREME CAUTION.",
			COMMAND_EXEC_EXTENDEDHELP: [
				'The --silent flag runs in silent mode, not showing any console output',
				'The --language <lang> flag sets the language of the outputted code block',
				'The --raw flag sends the output raw, without any code blocks',
				'The --delete flag deletes the command message',
				'The --file flag interperts the response as a file URL/path to send',
				'The --filename <name> flag sets the name for the sent file',
				'The --wait flag waits for the program to finish before sending the output',
				'The --timeout <ms> flag sets a timeout'
			].join("\n"),
			COMMAND_HEAPSNAPSHOT_DESCRIPTION: "Creates a heapdump for finding memory leaks.",
			COMMAND_HEAPSNAPSHOT_EXTENDEDHELP: [
				'The heapsnapshot command is very useful for bots that have memory issues, it uses the heapdump library',
				'which freezes the entire process for a moment to analyze all elements from the process\' HEAP, NEVER share',
				'heapsnapshot files with anybody, as everything your bot holds is included in that file.\n\nTo open heapsnapshot',
				'files, open Google Chrome, open Developer Tools, go to the tab Memory, and in Profiles, click on the button "load".',
				'Finally, open the profile and you will be given a table of all objects in your process, have fun!\n\nP.S:',
				'heapsnapshot files are as big as the amount of RAM you use, in big bots, the snapshots can freeze the bot',
				'much longer and the files can be much heavier.'
			].join(' '),
		}
	}

	async init() {
		await super.init();
	}

}