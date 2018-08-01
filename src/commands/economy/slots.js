const { Command } = require('../../structures');
const { SlotMachine, SlotSymbol } = require("slot-machine");

const watermelon = new SlotSymbol("watermelon", { display: "🍉", points: 1, weight: 100 });
const apple = new SlotSymbol("apple", { display: "🍎", points: 1, weight: 100 });
const grape = new SlotSymbol("grape", { display: "🍇", points: 1, weight: 100 });
const cherry = new SlotSymbol("cherry", { display: "🍒", points: 1, weight: 100 });
const wild = new SlotSymbol("wild", { display: "❔", points: 1, weight: 40, wildcard: true });
const bell = new SlotSymbol("bell", { display: "🔔", points: 2, weight: 40 });
const clover = new SlotSymbol("clover", { display: "🍀", points: 3, weight: 35 });
const heart = new SlotSymbol("heart", { display: "❤", points: 4, weight: 30 });
const diamond = new SlotSymbol("diamond", { display: "💎", points: 10, weight: 3 });
const jackpot = new SlotSymbol("jackpot", { display: "🔅", points: 50, weight: 5});

const machine = new SlotMachine(3, [cherry, apple, grape, wild, bell, clover, heart, diamond, jackpot]);

module.exports = class SlotsCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'slots',
      description: 'Play a game of slots.',
      syntax: 'slots',
      category: 'Economy',
      cooldown: 10
    });
  }

  execute(ctx) {
    let result = machine.play();
    const winnings = result.totalPoints * 10;

    ctx.send({
      description: `${result.visualize(false)}\n\n${result.winCount === 0 ? `${ctx.author.username} has lost. Better luck next time.` : `${ctx.author.username} has won!`}\n${result.winCount === 0 ? "" : `You have won \`${winnings}¥\``}`,
      color: this.bot.color
    });
    if (result.winCount > 0) return ctx.bot.utils.updateBalance(ctx.author.id, winnings);
  }
};