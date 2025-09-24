// 代码生成时间: 2025-09-24 12:33:16
const { ScheduleTaskService } = require('./schedule_task_service');  // 引入定义的定时任务服务

/**
 * 定时任务调度器，用于管理定时任务的添加、删除和执行。
 */
class ScheduleTaskScheduler {

  /**
   * 构造函数，初始化定时任务服务
   */
  constructor() {
    this.scheduleTaskService = new ScheduleTaskService();
  }

  /**
   * 添加定时任务
   * @param {string} name - 任务名称
   * @param {Function} task - 要执行的任务函数
   * @param {string} cron - 任务执行的Cron表达式
   * @returns {Promise<string>} - 返回添加任务的结果
   */
  async addTask(name, task, cron) {
    try {
      return await this.scheduleTaskService.addTask(name, task, cron);
    } catch (error) {
      console.error('添加任务失败:', error);
      throw new Error('添加任务失败');
    }
  }

  /**
   * 删除定时任务
   * @param {string} name - 任务名称
   * @returns {Promise<string>} - 返回删除任务的结果
   */
  async removeTask(name) {
    try {
      return await this.scheduleTaskService.removeTask(name);
    } catch (error) {
      console.error('删除任务失败:', error);
      throw new Error('删除任务失败');
    }
  }

  /**
   * 立即执行一次定时任务
   * @param {string} name - 任务名称
   * @returns {Promise<string>} - 返回执行任务的结果
   */
  async runTaskNow(name) {
    try {
      return await this.scheduleTaskService.runTaskNow(name);
    } catch (error) {
      console.error('执行任务失败:', error);
      throw new Error('执行任务失败');
    }
  }
}

module.exports = { ScheduleTaskScheduler };  // 导出定时任务调度器